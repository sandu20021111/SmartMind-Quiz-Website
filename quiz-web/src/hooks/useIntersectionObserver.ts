import { useEffect, useRef, useState } from 'react';

// Options for the Intersection Observer. Adjust `threshold` to control when the animation triggers.
// 0.1 means 10% of the element must be visible to trigger.
const defaultOptions = {
  root: null, // defaults to the viewport
  rootMargin: '0px',
  threshold: 0.1, // Trigger when 10% of the element is visible
};

/**
 * Custom hook to observe an element's visibility in the viewport.
 * @param options IntersectionObserver options.
 * @returns A ref to attach to the element and a boolean indicating if it's in view.
 */
// Added generic type T that extends HTMLElement
const useIntersectionObserver = <T extends HTMLElement>(options = defaultOptions) => {
  const elementRef = useRef<T | null>(null); // Use generic T here
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false); // New state to ensure it animates only once

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // If the element enters the viewport and hasn't animated yet, set isInView to true
      // and mark it as animated.
      if (entry.isIntersecting && !hasAnimated) {
        setIsInView(true);
        setHasAnimated(true); // Ensure it only animates once
        // Optionally, you can unobserve after it has animated to save resources
        // if (elementRef.current) {
        //   observer.unobserve(elementRef.current);
        // }
      }
    }, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Cleanup function
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [options, hasAnimated]); // Rerun if options change or after it has animated (to avoid re-observing if unobserved)

  return [elementRef, isInView] as const; // Return as tuple with inferred types
};

export default useIntersectionObserver;