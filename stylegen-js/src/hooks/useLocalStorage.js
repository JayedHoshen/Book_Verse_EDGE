import { useState } from "react";
export default function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : initial;
    } catch {
      return initial;
    }
  });
  return [
    state,
    (val) => {
      setState(val);
      localStorage.setItem(key, JSON.stringify(val));
    },
  ];
}
