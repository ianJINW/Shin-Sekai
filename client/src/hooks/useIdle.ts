import { useState, useEffect } from "react";

export default function useIdle(ms: number = 3000) {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleActivity = () => {
      setIsIdle(false);
      clearTimeout(timer);
      timer = setTimeout(() => setIsIdle(true), ms);
    };

    const events: (keyof WindowEventMap)[] = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
    ];

    events.forEach((event) => window.addEventListener(event, handleActivity));

    handleActivity();

    return () => {
      clearTimeout(timer);
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
    };
  }, [ms]);

  return isIdle;
}
