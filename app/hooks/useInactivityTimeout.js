import { useState, useEffect, useRef } from "react";

const useInactivityTimeout = (timeoutDuration = 12000) => {
  const [isRefetchActive, setIsRefetchActive] = useState(true);
  const inactivityTimeoutRef = useRef(null);

  useEffect(() => {
    const resetInactivityTimeout = () => {
      setIsRefetchActive(true);
      clearTimeout(inactivityTimeoutRef.current);
      inactivityTimeoutRef.current = setTimeout(() => {
        setIsRefetchActive(false);
      }, timeoutDuration);
    };

    window.addEventListener("mousemove", resetInactivityTimeout);
    window.addEventListener("keydown", resetInactivityTimeout);

    return () => {
      clearTimeout(inactivityTimeoutRef.current);
      window.removeEventListener("mousemove", resetInactivityTimeout);
      window.removeEventListener("keydown", resetInactivityTimeout);
    };
  }, [timeoutDuration]);

  return isRefetchActive;
};

export default useInactivityTimeout;
