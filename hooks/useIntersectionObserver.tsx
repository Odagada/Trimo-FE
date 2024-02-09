import { useRef } from "react";

export default function useIntersectionObserver(callback: () => {}) {
  let observer = null;
  if (typeof window !== "undefined") {
    observer = useRef(
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio >= 0.9) {
              // () => callback("1");
              callback();
            }
            // if (entry.intersectionRatio >= 0.2) {
            //   () => callback("2");
            // }
          });
        },
        { threshold: 0.89 }
      )
    );
  }

  const observe = (element: Element) => {
    observer.current.observe(element);
  };

  const unobserve = (element: Element) => {
    observer.current.unobserve(element);
  };

  return [observe, unobserve];
}
