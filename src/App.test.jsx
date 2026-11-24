import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';

// Install jsdom browser polyfills before importing components that register GSAP ScrollTrigger.
vi.hoisted(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
        }),
    });

    if (!window.IntersectionObserver) {
        window.IntersectionObserver = class {
            observe() {}
            unobserve() {}
            disconnect() {}
        };
    }
});

import App from './App';
import BookingContact from './components/BookingContact';
import { handler as contactHandler } from '../netlify/functions/contact.js';
import { resetRateLimitStore } from '../netlify/functions/security.js';

describe('Livada Stăuini App & Anti-Bot Protections', () => {
    beforeEach(() => {
        resetRateLimitStore();
        vi.restoreAllMocks();
    });

    afterEach(() => {
        cleanup();
    });

    test('App renders hero and contact section without custom cursor override', () => {
        render(<App />);
        expect(screen.getByText(/Descoperă Autenticitatea la Livada Stăuini/i)).toBeDefined();
        expect(screen.getByText(/Te Așteptăm în Livadă/i)).toBeDefined();
        expect(document.body.classList.contains('custom-cursor-active')).toBe(false);
        const heroCta = screen.getByRole('link', { name: /Vizitează Livada/i });
        expect(heroCta.getAttribute('href')).toBe('#vizite');

        const gmapsLink = screen.getByRole('link', { name: /Direcții Google Maps/i });
        expect(gmapsLink.getAttribute('href')).toBe('https://www.google.com/maps/dir/?api=1&destination=Livada+Stauini&destination_place_id=ChIJBw92kI-nTkcR1cAzeD1MSJM');
        expect(gmapsLink.getAttribute('rel')).toBe('noopener noreferrer');

        const wazeLink = screen.getByRole('link', { name: /Navighează cu Waze/i });
        expect(wazeLink.getAttribute('href')).toBe('https://www.waze.com/ul?to=place.ChIJBw92kI-nTkcR1cAzeD1MSJM&navigate=yes');
        expect(wazeLink.getAttribute('rel')).toBe('noopener noreferrer');
    });

    test('BookingContact allows real user submission after normal fill time', async () => {
        const nowSpy = vi.spyOn(Date, 'now');
        nowSpy.mockReturnValue(1_000_000);

        const fetchMock = vi.fn().mockResolvedValue({ ok: true });
        vi.stubGlobal('fetch', fetchMock);

        render(<BookingContact />);

        fireEvent.change(screen.getByLabelText(/Numele Tău/i), { target: { value: 'Ion Popescu' } });
        fireEvent.change(screen.getByLabelText(/Adresă de Email sau Telefon/i), { target: { value: 'ion@example.com' } });
        fireEvent.change(screen.getByLabelText(/Mesajul Tău/i), { target: { value: 'Vrem să vizităm livada sâmbătă.' } });

        // Simulate human filling time (> 1.2s)
        nowSpy.mockReturnValue(1_003_500);
        fireEvent.click(screen.getByRole('button', { name: /Trimite Mesajul/i }));

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledTimes(1);
            expect(screen.getByText(/Mesaj Trimis cu Succes!/i)).toBeDefined();
        });
    });

    test('BookingContact blocks bot submission when honeypot is filled', async () => {
        const nowSpy = vi.spyOn(Date, 'now');
        nowSpy.mockReturnValue(1_000_000);

        const fetchMock = vi.fn().mockResolvedValue({ ok: true });
        vi.stubGlobal('fetch', fetchMock);

        render(<BookingContact />);

        fireEvent.change(screen.getByLabelText(/Nu completa acest câmp/i), { target: { value: 'http://spam.example' } });
        fireEvent.change(screen.getByLabelText(/Numele Tău/i), { target: { value: 'Bot' } });
        fireEvent.change(screen.getByLabelText(/Adresă de Email sau Telefon/i), { target: { value: 'bot@example.com' } });
        fireEvent.change(screen.getByLabelText(/Mesajul Tău/i), { target: { value: 'Buy cheap stuff' } });

        nowSpy.mockReturnValue(1_005_000);
        fireEvent.click(screen.getByRole('button', { name: /Trimite Mesajul/i }));

        await waitFor(() => {
            expect(fetchMock).not.toHaveBeenCalled();
            expect(screen.getByText(/Mesaj Trimis cu Succes!/i)).toBeDefined();
        });
    });

    test('BookingContact blocks instant automated submission without calling fetch', async () => {
        const nowSpy = vi.spyOn(Date, 'now');
        nowSpy.mockReturnValue(1_000_000);

        const fetchMock = vi.fn().mockResolvedValue({ ok: true });
        vi.stubGlobal('fetch', fetchMock);

        render(<BookingContact />);

        fireEvent.change(screen.getByLabelText(/Numele Tău/i), { target: { value: 'Fast Bot' } });
        fireEvent.change(screen.getByLabelText(/Adresă de Email sau Telefon/i), { target: { value: 'fast@example.com' } });
        fireEvent.change(screen.getByLabelText(/Mesajul Tău/i), { target: { value: 'Instant submit' } });

        // Submitted 100ms after mount
        nowSpy.mockReturnValue(1_000_100);
        fireEvent.click(screen.getByRole('button', { name: /Trimite Mesajul/i }));

        await waitFor(() => {
            expect(fetchMock).not.toHaveBeenCalled();
            expect(screen.getByRole('alert').textContent).toMatch(/aștepți o secundă/i);
        });
    });

    test('Netlify contact function validates input, enforces rate limits, and rejects oversized payloads', async () => {
        const okRes = await contactHandler({
            httpMethod: 'POST',
            headers: { 'x-nf-client-connection-ip': '203.0.113.10' },
            body: JSON.stringify({
                name: 'Maria',
                email: 'maria@example.com',
                message: 'Bună ziua, dorim o vizită.',
                formLoadedAt: Date.now() - 5000,
            }),
        });
        expect(okRes.statusCode).toBe(200);
        expect(okRes.headers['X-Content-Type-Options']).toBe('nosniff');

        const badRes = await contactHandler({
            httpMethod: 'POST',
            headers: { 'x-nf-client-connection-ip': '203.0.113.11' },
            body: JSON.stringify({ name: '   ', email: 'a@b.com', message: 'hi' }),
        });
        expect(badRes.statusCode).toBe(400);

        const bigRes = await contactHandler({
            httpMethod: 'POST',
            headers: { 'x-nf-client-connection-ip': '203.0.113.12' },
            body: JSON.stringify({ name: 'A', email: 'a@b.com', message: 'x'.repeat(20000) }),
        });
        expect(bigRes.statusCode).toBe(413);

        for (let i = 0; i < 8; i += 1) {
            await contactHandler({
                httpMethod: 'POST',
                headers: { 'x-nf-client-connection-ip': '203.0.113.99' },
                body: JSON.stringify({ name: 'Ana', email: 'ana@example.com', message: 'Test' }),
            });
        }
        const limitedRes = await contactHandler({
            httpMethod: 'POST',
            headers: { 'x-nf-client-connection-ip': '203.0.113.99' },
            body: JSON.stringify({ name: 'Ana', email: 'ana@example.com', message: 'Test' }),
        });
        expect(limitedRes.statusCode).toBe(429);
    });
});
