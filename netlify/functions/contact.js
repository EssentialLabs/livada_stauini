// POST /netlify/functions/contact
// Placeholder for Contact Form handling

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        const data = JSON.parse(event.body || "{}");

        // In a real application, connect to SendGrid, Resend, or your email API here
        console.log("Contact form stub received:", data);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                success: true,
                message: "Îți mulțumim pentru mesaj! Te vom contacta în curând.",
                note: "This is a stub. Connect env vars and an email API to handle routing."
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed submitting contact form' })
        };
    }
};
