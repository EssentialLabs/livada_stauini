// POST /netlify/functions/contact
// Hardened contact form handler with honeypot, timing, validation, and rate limiting.

import {
    jsonResponse,
    getClientIp,
    checkRateLimit,
    parseEventBody,
    isBotPayload,
} from './security.js';

const MAX_NAME_LEN = 120;
const MAX_EMAIL_LEN = 160;
const MAX_MESSAGE_LEN = 2000;

export const handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return jsonResponse(405, { error: 'Method Not Allowed' });
    }

    const rate = checkRateLimit(getClientIp(event), { maxRequests: 8, windowMs: 10 * 60 * 1000 });
    if (!rate.allowed) {
        return jsonResponse(429, { error: 'Prea multe cereri. Te rugăm să încerci din nou mai târziu.' });
    }

    const { data, error } = parseEventBody(event);
    if (error) return error;

    // Return a neutral 200 without forwarding spam so automated bots do not keep retrying.
    if (isBotPayload(data)) {
        return jsonResponse(200, {
            success: true,
            message: 'Îți mulțumim pentru mesaj! Te vom contacta în curând.',
        });
    }

    const name = typeof data.name === 'string' ? data.name.trim() : '';
    const email = typeof data.email === 'string' ? data.email.trim() : '';
    const message = typeof data.message === 'string' ? data.message.trim() : '';

    if (!name || !email || !message) {
        return jsonResponse(400, { error: 'Te rugăm să completezi toate câmpurile obligatorii.' });
    }

    if (name.length > MAX_NAME_LEN || email.length > MAX_EMAIL_LEN || message.length > MAX_MESSAGE_LEN) {
        return jsonResponse(400, { error: 'Mesajul depășește lungimea maximă permisă.' });
    }

    // In production, forward validated fields to an email provider (e.g. Resend, SendGrid).
    return jsonResponse(200, {
        success: true,
        message: 'Îți mulțumim pentru mesaj! Te vom contacta în curând.',
    });
};
