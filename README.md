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
