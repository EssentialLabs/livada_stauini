// POST /netlify/functions/aiSummary
// Requires ENV VAR: OPENAI_API_KEY (placeholder for future SPIRAL integration)

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        const { userId, entries } = JSON.parse(event.body || "{}");

        // placeholder logic - will be replaced by LLM logic
        const summary = `Aceasta este o rezumare automată pentru utilizatorul ${userId || 'anonim'}. ` +
            `Am procesat ${entries ? entries.length : 0} intrări.`;

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                success: true,
                summary: summary,
                note: "Scaffolding only. Implement target LLM call here."
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed generating summary' })
        };
    }
};
