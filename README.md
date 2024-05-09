# useCallback

```
The React useCallback Hook returns a memoized callback function.

Think of memoization as caching a value so that it does not need to be recalculated.

This allows us to isolate resource intensive functions so that they will not automatically run on every render.

The useCallback Hook only runs when one of its dependencies update.

This can improve performance.

The useCallback and useMemo Hooks are similar. The main difference is that useMemo returns a memoized value and useCallback returns a memoized function.
```

# Custom Hooks in React

```
Custom hooks in React are a powerful feature that allows you to extract and reuse stateful logic from components. They are JavaScript functions whose names start with "use" and can call other hooks if necessary. Here's a brief overview of how custom hooks work:

Create a Function: Begin by creating a JavaScript function. The function name should start with "use" to follow the convention.
javascript
Copy code
import { useState, useEffect } from 'react';

function useCustomHook(initialValue) {
    // Your logic here
}
Define Logic: Write the logic inside the custom hook function. You can use existing hooks like useState, useEffect, useRef, etc., within your custom hook.
javascript
Copy code
function useCustomHook(initialValue) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        // Do something on component mount or update
        console.log('Value changed:', value);
    }, [value]); // useEffect dependency array

    const increment = () => {
        setValue(prevValue => prevValue + 1);
    };

    return { value, increment };
}
Use the Custom Hook: You can then use this custom hook in any functional component.
javascript
Copy code
import React from 'react';

function MyComponent() {
    const { value, increment } = useCustomHook(0);

    return (
        <div>
            <p>Value: {value}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
}
Custom hooks provide a clean way to separate concerns in your React code, making it easier to manage and reuse logic across components.

Here's an example of a custom hook to fetch data from an API:

javascript
Copy code
import { useState, useEffect } from 'react';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [url]); // useEffect dependency array

    return { data, loading, error };
}

export default useFetch;
You can then use this hook in any component to fetch data:

javascript
Copy code
import React from 'react';
import useFetch from './useFetch';

function MyComponent() {
    const { data, loading, error } = useFetch('https://api.example.com/data');

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            {/* Render your data */}
        </div>
    );
}
This way, you can reuse this logic in multiple components without duplicating code. Custom hooks allow you to keep your components clean and focused on rendering UI.
```
