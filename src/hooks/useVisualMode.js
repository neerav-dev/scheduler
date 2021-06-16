import { useState } from "react";

const useVisualMode = function (initialMode) {
  const [mode, setMode] = useState(initialMode);

  const [history, setHistory] = useState([initialMode]);

  const transition = function (newMode, replace = false) {
    if (replace) {
      const portionHistory = [...history.slice(0, history.length - 1)];
      const newHistory = [...portionHistory, newMode];
      setHistory(newHistory);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }

    setMode(newMode);
  };

  const back = function () {
    if (history.length > 1) {
      const newHistory = [...history.slice(0, history.length - 1)];

      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  };

  return { mode, transition, back };
};

export default useVisualMode;
