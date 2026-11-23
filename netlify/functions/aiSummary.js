// POST /netlify/functions/aiSummary
// Requires ENV VAR: OPENAI_API_KEY (placeholder for future SPIRAL integration)

import {
    jsonResponse,
    getClientIp,
    checkRateLimit,
    parseEventBody,
} from './security.js';

const MAX_ENTRIES = 50;
const MAX_USER_ID_LEN = 80;

export const handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return jsonResponse(405, { error: 'Method Not Allowed' });
    }

    const rate = checkRateLimit(`ai:${getClientIp(event)}`, { maxRequests: 10, windowMs: 10 * 60 * 1000 });
    if (!rate.allowed) {
        return jsonResponse(429, { error: 'Too many requests. Please try again later.' });
    }

    const { data, error } = parseEventBody(event);
    if (error) return error;

    const rawUserId = typeof data.userId === 'string' ? data.userId.trim().slice(0, MAX_USER_ID_LEN) : '';
    const safeUserId = rawUserId.replace(/[^\w.-]/g, '') || 'anonim';
    const entries = Array.isArray(data.entries) ? data.entries.slice(0, MAX_ENTRIES) : [];

    // Placeholder logic until LLM integration is configured.
    const summary = `Aceasta este o rezumare automată pentru utilizatorul ${safeUserId}. ` +
        `Am procesat ${entries.length} intrări.`;

    return jsonResponse(200, {
        success: true,
        summary,
        note: 'Scaffolding only. Implement target LLM call here.',
    });
};
