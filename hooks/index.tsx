import { useEffect, useState } from "react";

export function useLocalStorage(key: any, initialValue: any) {
  let storedValue;
  if (typeof window !== "undefined") {
    storedValue = window.localStorage.getItem(key);
  }

  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState(initial);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
