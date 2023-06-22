import { RefObject, useEffect, useMemo, useState } from "react";

export default function useOnScreen(
  ref: RefObject<HTMLDivElement>,
  reload: boolean = false
) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );
    ref?.current && observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reload]);

  return isIntersecting;
}
