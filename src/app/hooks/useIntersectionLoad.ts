import { useEffect, useRef, useState } from "react";

export const useIntersectionLoad = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) callback();
    });
    obs.observe(ref.current);
    setObserver(obs);

    return () => obs.disconnect();
  }, [callback]);

  return ref;
};
