/// <reference types="vite/client" />

type ThemeType = "light" | "dark";

interface ThemeContextType {
	themeMode: ThemeType;
	darkTheme: () => void;
	lightTheme: () => void;
}
