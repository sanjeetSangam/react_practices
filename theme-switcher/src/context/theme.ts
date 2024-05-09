import { createContext, useContext } from "react";

const ThemeContext = createContext<ThemeContextType>({
	themeMode: "light",
	darkTheme: () => {},
	lightTheme: () => {},
});

const ThemeProvider = ThemeContext.Provider;

const useTheme = () => {
	return useContext(ThemeContext);
};

export { ThemeContext, ThemeProvider, useTheme };
