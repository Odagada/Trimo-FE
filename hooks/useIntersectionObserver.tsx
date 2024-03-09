import { MutableRefObject, useEffect } from "react";

type Options = {
  threshold?: number | number[];
  root?: HTMLElement;
  rootMargin?: string;
};

interface Props {
  target: MutableRefObject<HTMLElement | null>;
  onIntersect: () => void;
  deps?: unknown[];
}

export default function useInterSectionObserver({ target, onIntersect, deps = [] }: Props) {
  useEffect(() => {
    let observer: IntersectionObserver;
    if (target && target.current) {
      observer = new IntersectionObserver((entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect();
          }
        })
      );
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
  }, [target, ...deps]);
}
