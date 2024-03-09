import { useEffect } from 'react';

export const useThemeSwitcher = (mode: string) => {
    useEffect(() => {
        const html = document.documentElement;
        const previousTheme = html.className;

        if (previousTheme !== mode) {
            html.className = mode;
        }

        return () => {
            if (previousTheme !== mode) {
                html.className = previousTheme;
            }
        };
    }, []);
};
