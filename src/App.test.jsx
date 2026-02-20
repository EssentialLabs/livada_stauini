import { render, screen } from '@testing-library/react';
import App from './App';
import { expect, test } from 'vitest';
import React from 'react';

// Setup matchMedia mock for testing environment
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => { }, // deprecated
        removeListener: () => { }, // deprecated
        addEventListener: () => { },
        removeEventListener: () => { },
        dispatchEvent: () => false,
    }),
});

test('App renders without crashing', () => {
    render(<App />);
    const toggleBtn = screen.getByRole('button', { name: /toggle custom cursor/i });
    expect(toggleBtn).toBeDefined();
});
