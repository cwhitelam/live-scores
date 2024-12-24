import { useState, useEffect, RefObject } from 'react';

export function useScrollBehavior(
  containerRef: RefObject<HTMLDivElement>,
  contentRef: RefObject<HTMLDivElement>,
  speed: number,
  resumeDelay: number,
  isAutoScrollEnabled: boolean
) {
  const [contentHeight, setContentHeight] = useState(0);
  const [lastInteraction, setLastInteraction] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current || !isAutoScrollEnabled) return;

    const container = containerRef.current;
    let startTime: number | null = null;
    let lastScrollTop = container.scrollTop;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      const pixelsToScroll = (progress / 1000) * speed;
      container.scrollTop = pixelsToScroll % contentHeight;

      if (container.scrollTop < lastScrollTop) {
        // We've wrapped around to the top
        container.scrollTop = 0;
        startTime = timestamp;
      }

      lastScrollTop = container.scrollTop;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [speed, contentHeight, isAutoScrollEnabled]);

  const handleInteraction = () => {
    setLastInteraction(Date.now());
  };

  const handleScroll = () => {
    setLastInteraction(Date.now());
  };

  return {
    contentHeight,
    handleInteraction,
    handleScroll
  };
}