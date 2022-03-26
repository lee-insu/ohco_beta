const { useState, useEffect } = require("react");

export const useWindowSize = () => {
  const isClient = typeof window === "object";

  const getSize = () => {
    return { width: isClient ? window.innerWidth : undefined };
  };

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }
    const handleResize = () => {
      setWindowSize(getSize());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};
