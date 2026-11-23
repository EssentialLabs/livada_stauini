// Shared anti-bot and request-hardening helpers for Netlify Functions.

export const MAX_BODY_BYTES = 16 * 1024;
export const MIN_HUMAN_SUBMIT_MS = 1200;
const rateStore = new Map();

export const SECURITY_HEADERS = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
};

export function jsonResponse(statusCode, payload) {
    return {
        statusCode,
        headers: SECURITY_HEADERS,
        body: JSON.stringify(payload),
    };
}

export function getClientIp(event) {
    const headers = event?.headers || {};
    const directIp = headers['x-nf-client-connection-ip'] || headers['X-Nf-Client-Connection-Ip'];
    if (directIp) return String(directIp).trim();

    const forwarded = headers['x-forwarded-for'] || headers['X-Forwarded-For'];
    if (forwarded) return String(forwarded).split(',')[0].trim();

    return 'unknown';
}

export function checkRateLimit(ip, { maxRequests = 10, windowMs = 10 * 60 * 1000 } = {}) {
    const now = Date.now();
    const cutoff = now - windowMs;

    // Prune expired buckets occasionally to keep memory bounded on warm instances.
    if (rateStore.size > 500) {
        for (const [key, timestamps] of rateStore.entries()) {
            const active = timestamps.filter((ts) => ts > cutoff);
            if (active.length === 0) rateStore.delete(key);
            else rateStore.set(key, active);
        }
    }

    const recent = (rateStore.get(ip) || []).filter((ts) => ts > cutoff);
    if (recent.length >= maxRequests) {
        return { allowed: false, retryAfterSec: Math.ceil(windowMs / 1000) };
    }

    recent.push(now);
    rateStore.set(ip, recent);
    return { allowed: true };
}

export function parseEventBody(event, maxBytes = MAX_BODY_BYTES) {
    const raw = event?.body || '';
    if (new TextEncoder().encode(raw).length > maxBytes) {
        return { error: jsonResponse(413, { error: 'Payload too large' }) };
    }

    const contentType = String(
        event?.headers?.['content-type'] || event?.headers?.['Content-Type'] || ''
    ).toLowerCase();

    try {
        if (contentType.includes('application/x-www-form-urlencoded')) {
            const params = new URLSearchParams(raw);
            return { data: Object.fromEntries(params.entries()) };
        }
        return { data: JSON.parse(raw || '{}') };
    } catch {
        return { error: jsonResponse(400, { error: 'Invalid request body' }) };
    }
}

export function isBotPayload(data, minElapsedMs = MIN_HUMAN_SUBMIT_MS) {
    const honeypot = data?.['bot-field'] ?? data?.botField;
    if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
        return true;
    }

    if (data?.formLoadedAt !== undefined) {
        const loadedAt = Number(data.formLoadedAt);
        if (!Number.isFinite(loadedAt) || Date.now() - loadedAt < minElapsedMs) {
            return true;
        }
    }

    return false;
}

export function resetRateLimitStore() {
    rateStore.clear();
}
