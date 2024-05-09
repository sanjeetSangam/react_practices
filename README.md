# useCallback

```
The React useCallback Hook returns a memoized callback function.

Think of memoization as caching a value so that it does not need to be recalculated.

This allows us to isolate resource intensive functions so that they will not automatically run on every render.

The useCallback Hook only runs when one of its dependencies update.

This can improve performance.

The useCallback and useMemo Hooks are similar. The main difference is that useMemo returns a memoized value and useCallback returns a memoized function.
```

---

# Custom Hooks in React

**Custom Hooks in React**

Custom hooks in React are JavaScript functions that allow you to extract and reuse logic from components. They start with the word "use" and can contain state, side effects, or any other functionality. Here's how they work:

**1. Definition**: Custom hooks start with "use" and are used to abstract and share logic between components.

**2. Purpose**: They help to keep components clean by extracting reusable logic into separate functions.

**3. Usage**: Create a function with the logic you want to reuse, utilizing built-in hooks like `useState` and `useEffect`.

```javascript
import { useState, useEffect } from "react";

function useCustomHook(initialValue) {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		console.log("Value changed:", value);
	}, [value]);

	const increment = () => {
		setValue((prevValue) => prevValue + 1);
	};

	return { value, increment };
}
```

**4. Example Usage in Component**:

```javascript
import React from "react";
import useCustomHook from "./useCustomHook";

function MyComponent() {
	const { value, increment } = useCustomHook(0);

	return (
		<div>
			<p>Value: {value}</p>
			<button onClick={increment}>Increment</button>
		</div>
	);
}
```

**5. Benefits**:

-   **Reusability**: Logic can be easily reused across multiple components.
-   **Separation of Concerns**: Keeps components focused on UI rendering.
-   **Cleaner Code**: Reduces duplication and improves maintainability.

Custom hooks are a powerful feature in React for creating composable and reusable logic across your application.

---

# React-router-dom

Protected routes are routes that should only be accessible to authenticated users. If a user is not authenticated, they should be redirected to a login page.

First, you would typically have a layout component that contains the common layout structure of your application. Within this layout, you can define your routes, including both public and protected routes.

Here's a basic example:

```javascript
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// Assume these are your components for various routes
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

// Define a simple authentication context
const AuthContext = React.createContext();

function App() {
	const [loggedIn, setLoggedIn] = useState(false);

	return (
		<AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					{/* Protected route */}
					<Route
						path="/dashboard"
						element={<ProtectedRoute component={<Dashboard />} />}
					/>
				</Routes>
			</Router>
		</AuthContext.Provider>
	);
}

// ProtectedRoute component to handle authentication
function ProtectedRoute({ component }) {
	const { loggedIn } = useContext(AuthContext);

	// If user is not logged in, redirect to login page
	if (!loggedIn) {
		return <Navigate to="/login" />;
	}

	// If user is logged in, render the protected component
	return component;
}

export default App;
```

In this example:

-   We define a `BrowserRouter` as the router container for our routes.
-   We have a simple `AuthContext` to manage the authentication state.
-   The `ProtectedRoute` component checks if the user is authenticated (`loggedIn`). If they are, it renders the protected component passed as a prop (`component`). If not, it redirects the user to the login page using the `Navigate` component.
-   Within the `App` component, we define our routes. The `/dashboard` route is protected and will only be accessible if the user is authenticated.

You would need to handle the actual authentication logic in your application, such as verifying user credentials and setting the `loggedIn` state accordingly. Additionally, you may want to implement features like session persistence or token-based authentication for a more robust authentication system.

---

# useContext

The Context API in React is a way to manage state that can be accessed by multiple components throughout the component tree, without having to pass props manually at each level. It provides a convenient way to share data between components that are not directly connected through the component hierarchy.

Here's a brief overview:

1. **Provider-Consumer Pattern**: Context works on a provider-consumer pattern. A parent component provides the context, and child components consume it.

2. **Create Context**: You create a context using `React.createContext()`. This returns an object with a `Provider` and a `Consumer`.

3. **Provider**: The `Provider` component is used to wrap the part of the component tree where you want to make the context available. It takes a `value` prop, which is the data you want to share.

4. **Consumer**: The `Consumer` component allows consuming the context within a component. It uses a render prop pattern or the `useContext` hook to access the context value.

5. **useContext Hook**: In addition to using the `Consumer`, React provides a `useContext` hook, which allows functional components to consume context more easily.

6. **Updating Context**: The context provider re-renders whenever the `value` prop changes. Components consuming the context re-render whenever the context they depend on changes.

7. **Performance Considerations**: Context should be used for sharing data that is truly global to the application or deeply nested components. It's not recommended to use context as a replacement for prop drilling in all cases, as it can lead to unnecessary re-renders if overused.

Overall, the Context API provides a powerful mechanism for managing global state in React applications and can be particularly useful for managing themes, user authentication, or language preferences across components.

Here's a simple example demonstrating the usage of the Context API in React:

```javascript
import React, { createContext, useState, useContext } from "react";
import ReactDOM from "react-dom";

// Step 1: Create a context
const ThemeContext = createContext();

// Step 2: Create a provider component
const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState("light");

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

// Step 3: Create a consumer hook or component to access the context
const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

// Example usage of the ThemeProvider and useTheme hook
const App = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<div className={theme}>
			<button onClick={toggleTheme}>Toggle Theme</button>
			<h1>{theme === "light" ? "Light Theme" : "Dark Theme"}</h1>
		</div>
	);
};

// Step 4: Wrap your application with the provider
ReactDOM.render(
	<ThemeProvider>
		<App />
	</ThemeProvider>,
	document.getElementById("root")
);
```

In this example:

-   We create a `ThemeContext` using `createContext`.
-   We create a `ThemeProvider` component to provide the theme state and the function to toggle the theme.
-   We create a custom hook `useTheme` to consume the theme context within components.
-   The `App` component consumes the theme context using the `useTheme` hook.
-   Finally, we wrap our `App` component with the `ThemeProvider` component to make the theme context available throughout the component tree.

When you click the "Toggle Theme" button, it will switch between light and dark themes, and all components consuming the theme context will re-render with the updated theme.
