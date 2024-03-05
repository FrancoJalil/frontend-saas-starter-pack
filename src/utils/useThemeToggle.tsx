import { useTheme } from "@/components/theme-provider";
import { useState, useEffect } from "react";
import { Theme } from "@/components/theme-provider";

export const useThemeToggle = (mode: Theme) => {
    const { theme, setTheme } = useTheme();
    const [previousTheme, setPreviousTheme] = useState<Theme>(theme)

    const toggleTheme = () => {
        setPreviousTheme(theme);
        setTheme(mode);
        localStorage.setItem('vite-ui-theme', theme)
    };

    useEffect(() => {
        toggleTheme()
        return () => {
            if (previousTheme) {
                setTheme(previousTheme);
            }
        };
    }, [])

    return { theme, toggleTheme };
};

