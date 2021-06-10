import { useState, useCallback } from "react";

function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);

  const [history, setHistory] = useState([initialMode]);

  const transition = function (newMode, replace = false) {
    if (replace) {
      back();
    }
    setMode(newMode);
    setHistory((prev) => [...prev, newMode]);
  };

  const back = function () {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      const previousMode = newHistory[newHistory.length - 1];
      setMode(previousMode);
    }
  };

  return { mode, transition, back };
}

export default useVisualMode;
