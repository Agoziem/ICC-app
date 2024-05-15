import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
    const isClient = typeof window !== 'undefined';

    const [storedValue, setStoredValue] = useState(() => {
        if (isClient) {
            try {
                const item = window.localStorage.getItem(key);
                return item ? JSON.parse(item) : initialValue;
            } catch (error) {
                console.log(error);
                return initialValue;
            }
        } else {
            return initialValue;
        }
    });

    const setValue = value => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (isClient) {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isClient) {
            const item = window.localStorage.getItem(key);
            if (item) {
                setStoredValue(JSON.parse(item));
            }
        }
    }, [key, isClient]);

    return [storedValue, setValue];
}

export default useLocalStorage;
