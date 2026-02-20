import fm from 'front-matter';
import { useMemo } from 'react';
import romaniansContent from '../../content/ro/română.md?raw';

export function useContent() {
    const content = useMemo(() => {
        try {
            const parsed = fm(romaniansContent);
            return parsed.attributes;
        } catch (e) {
            console.error("Error parsing content:", e);
            return {};
        }
    }, []);

    return content;
}
