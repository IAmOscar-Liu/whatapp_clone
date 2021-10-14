import { useState, useEffect } from "react";

const PREFIX = "whatsapp-clone-";

const useLocalStorage = <T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const prefix_key = PREFIX + key;
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(prefix_key);
        if (jsonValue != null) return JSON.parse(jsonValue);
        if (typeof initialValue === 'function') {
            return initialValue();
        } else {
            return initialValue;
        }
    });

    useEffect(() => {
       localStorage.setItem(prefix_key, JSON.stringify(value)); 
    }, [value, setValue, prefix_key])

    return [value, setValue];
}

export default useLocalStorage;
