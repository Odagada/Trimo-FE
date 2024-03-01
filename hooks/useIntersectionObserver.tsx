import { MutableRefObject, useEffect } from "react";

type Options = {
  threshold?: number | number[];
  root?: HTMLElement;
  rootMargin?: string;
};

interface Props {
  target: MutableRefObject<HTMLElement | null>;
  onIntersect: IntersectionObserverCallback;
  page?: string;
  options?: Options;
}

export default function useInterSectionObserver({ target, onIntersect, options, page = "1" }: Props) {
  useEffect(() => {
    let observer: IntersectionObserver;
    if (target && target.current) {
      observer = new IntersectionObserver(onIntersect, options);
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, page]);
}
