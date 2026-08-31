import { useEffect, useRef, useState, type ReactNode } from "react";
import { ThemeContext, type Theme } from "./ThemeContext";

interface ThemeProviderProps {
    children: ReactNode;
}

function getInitialTheme(): Theme {
    return document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
}

function getStoredTheme(): Theme | null {
    try {
        const storedTheme = localStorage.getItem("theme");
        return storedTheme === "light" || storedTheme === "dark"
            ? storedTheme
            : null;
    } catch {
        return null;
    }
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);
    const hasUserPreference = useRef(getStoredTheme() !== null);

    useEffect(() => {
        const root = document.documentElement;
        const themeColor = document.querySelector<HTMLMetaElement>(
            'meta[name="theme-color"]',
        );

        root.classList.toggle("dark", theme === "dark");
        root.style.colorScheme = theme;
        themeColor?.setAttribute(
            "content",
            theme === "dark" ? "#0f1115" : "#f8fafc",
        );
    }, [theme]);

    useEffect(() => {
        if (hasUserPreference.current) return;

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleSystemThemeChange = (event: MediaQueryListEvent) => {
            if (!hasUserPreference.current) {
                setTheme(event.matches ? "dark" : "light");
            }
        };

        mediaQuery.addEventListener("change", handleSystemThemeChange);

        return () => {
            mediaQuery.removeEventListener("change", handleSystemThemeChange);
        };
    }, []);

    function toggleTheme() {
        const nextTheme: Theme = theme === "dark" ? "light" : "dark";
        hasUserPreference.current = true;

        try {
            localStorage.setItem("theme", nextTheme);
        } catch {
            // A interface continua funcionando mesmo sem acesso ao armazenamento.
        }

        setTheme(nextTheme);
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
