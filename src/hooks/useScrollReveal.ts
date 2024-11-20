import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface ScrollRevealOptions {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const useScrollReveal = (options: ScrollRevealOptions = {}) => {
  const {
    threshold = 0.1,
    triggerOnce = true,
    delay = 0,
    direction = 'up',
  } = options;

  // Using useInView hook to observe when an element enters the viewport
  const [inViewRef, inView] = useInView({
    threshold,
    triggerOnce,
  });

  // Using useRef to keep track of the HTML element
  const elementRef = useRef<HTMLElement | null>(null);

  // Effect to handle revealing the element when it comes into view
  useEffect(() => {
    if (inView && elementRef.current) {
      const element = elementRef.current;
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translate(0, 0)';
      }, delay);
    }
  }, [inView, delay]);

  // Function to return initial styles based on direction
  const getInitialStyle = () => {
    const baseStyle = {
      opacity: 0,
      transform: '',
      transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      transitionDelay: `${delay}ms`,
    };

    switch (direction) {
      case 'up':
        return { ...baseStyle, transform: 'translateY(50px)' };
      case 'down':
        return { ...baseStyle, transform: 'translateY(-50px)' };
      case 'left':
        return { ...baseStyle, transform: 'translateX(50px)' };
      case 'right':
        return { ...baseStyle, transform: 'translateX(-50px)' };
      default:
        return baseStyle;
    }
  };

  // Combine both refs (useInView and local elementRef) to handle observing
  return {
    ref: (el: HTMLElement | null) => {
      inViewRef(el);
      elementRef.current = el;
    },
    style: getInitialStyle(),
  };
};

export default useScrollReveal;
