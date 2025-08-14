import React, { useState, useEffect, useRef } from 'react';

function Slider({ title, children, autoSlideInterval = 3000 }) {
  const raw = React.Children.toArray(children);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);
  const currentRef = useRef(0);

  // Detect mode: if user passed a single scrollable container (common in your Homepage)
  const singleChild = raw.length === 1 ? raw[0] : null;
  const innerChildren = singleChild
    ? React.Children.toArray(singleChild.props?.children)
    : [];
  const isScrollableChild = Boolean(
    singleChild &&
      (innerChildren.length > 1 ||
        String(singleChild.props?.className || '').includes('overflow-x-auto')),
  );

  // (do not return early here - hooks must be called in the same order every render)
  // if (raw.length === 0) return null;

  // Styles for active/inactive children
  const activeStyle = {
    transform: 'scale(1)',
    filter: 'brightness(1)',
    transition: 'transform 300ms ease, filter 300ms ease',
    transformOrigin: 'center center',
  };
  const inactiveStyle = {
    transform: 'scale(0.93)',
    filter: 'brightness(0.65)',
    transition: 'transform 300ms ease, filter 300ms ease',
    transformOrigin: 'center center',
  };

  // Helper to compute centered scroll position for an item
  const computeCenterLeft = (el, item) => {
    if (!el || !item) return 0;
    const itemLeft = item.offsetLeft;
    const left = itemLeft - (el.clientWidth - item.clientWidth) / 2;
    return Math.max(0, left);
  };

  // prepare duplicated children for seamless scrolling (three copies)
  const duplicatedChildren = isScrollableChild
    ? Array.from({ length: 3 }).flatMap(() => innerChildren)
    : [];

  // Helper to scroll to an index inside the duplicated children
  const scrollToIndex = (el, idx, smooth = true) => {
    const children = el.children;
    if (!children || children.length === 0) return;
    const item = children[idx];
    if (!item) return;
    const left = computeCenterLeft(el, item);
    if (!smooth) {
      const prev = el.style.scrollBehavior;
      el.style.scrollBehavior = 'auto';
      el.scrollLeft = left;
      requestAnimationFrame(() => {
        el.style.scrollBehavior = prev || 'smooth';
      });
    } else {
      el.scrollTo({ left, behavior: 'smooth' });
    }
  };

  const stopAuto = () => {
    clearInterval(intervalRef.current);
  };

  const startAuto = () => {
    stopAuto();
    const el = scrollRef.current;
    if (!el || !isScrollableChild) return;
    const originalCount = innerChildren.length;
    if (originalCount === 0) return;

    intervalRef.current = setInterval(() => {
      const children = el.children;
      if (!children || children.length === 0) return;
      currentRef.current = currentRef.current + 1;
      scrollToIndex(el, currentRef.current, true);

      setTimeout(() => {
        if (currentRef.current >= originalCount * 2) {
          currentRef.current = currentRef.current - originalCount;
          scrollToIndex(el, currentRef.current, false);
        }
        const visible = currentRef.current % originalCount;
        setActiveIndex(visible);
      }, 520);
    }, autoSlideInterval);
  };

  // Mode A: scrollable single child -> seamless infinite by duplicating items
  useEffect(() => {
    stopAuto();
    if (!isScrollableChild) return undefined;
    const el = scrollRef.current;
    if (!el) return undefined;

    const originalCount = innerChildren.length;
    if (originalCount === 0) return undefined;

    // Start at the middle copy so we can scroll forward/backward seamlessly
    currentRef.current = originalCount; // middle copy first item index

    // Wait a frame so DOM children exist, then position to the middle start without animation
    requestAnimationFrame(() => {
      scrollToIndex(el, currentRef.current, false);
      // start auto after positioning
      startAuto();
    });

    return () => stopAuto();
  }, [isScrollableChild, autoSlideInterval, innerChildren.length]);

  // Mode B: multiple children passed directly -> behave as full-width slides
  useEffect(() => {
    if (isScrollableChild) return undefined;
    if (raw.length <= 1) return undefined;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % raw.length);
    }, autoSlideInterval);
    return () => clearInterval(intervalRef.current);
  }, [isScrollableChild, raw.length, autoSlideInterval]);

  return (
    <div className="slider w-full select-none">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="slider-header text-hd-lg font-light">{title}</h2>
      </div>

      <div className="slider-body hide-scrollbar relative overflow-hidden">
        {isScrollableChild ? (
          // Build a duplicated flex row so we can scroll seamlessly
          <div
            ref={scrollRef}
            className={
              singleChild.props?.className ||
              'hide-scrollbar flex gap-6 overflow-x-auto'
            }
            style={{ scrollBehavior: 'smooth' }}
          >
            {duplicatedChildren.map((child, idx) => {
              const originalIdx = idx % innerChildren.length;
              return (
                <div key={idx} style={{ display: 'inline-block' }}>
                  <div
                    style={
                      originalIdx === activeIndex ? activeStyle : inactiveStyle
                    }
                  >
                    {child}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Full-width slide mode
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: `${raw.length * 100}%`,
              transform: `translateX(-${activeIndex * (100 / Math.max(1, raw.length))}%)`,
            }}
          >
            {raw.map((child, idx) => (
              <div
                className="w-full flex-shrink-0"
                key={idx}
                style={{ minWidth: `calc(100% / ${Math.max(1, raw.length)})` }}
              >
                <div style={idx === activeIndex ? activeStyle : inactiveStyle}>
                  {child}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {(isScrollableChild ? innerChildren : raw).map((_, idx) => (
          <button
            key={idx}
            className={`h-1.5 w-8 rounded-full transition-colors duration-600 ${
              idx === activeIndex ? 'bg-[#FC4747]' : 'bg-[#b1b6ce]'
            } cursor-pointer`}
            style={{ border: 'none', outline: 'none', cursor: 'pointer' }}
            onClick={() => {
              if (isScrollableChild) {
                const el = scrollRef.current;
                if (!el) return;
                const children = el.children;
                if (!children || children.length === 0) return;
                const originalCount = innerChildren.length;
                // pick the nearest duplicated occurrence among the three copies
                let bestIndex = -1;
                let bestDist = Infinity;
                const currentLeft = el.scrollLeft;
                for (let k = 0; k < 3; k++) {
                  const candidate = idx + k * originalCount;
                  if (candidate >= children.length) continue;
                  const left = computeCenterLeft(el, children[candidate]);
                  const dist = Math.abs(left - currentLeft);
                  if (dist < bestDist) {
                    bestDist = dist;
                    bestIndex = candidate;
                  }
                }
                if (bestIndex === -1) return;

                // stop automatic scrolling, move to chosen duplicated item, then restart auto after a delay
                stopAuto();
                scrollToIndex(el, bestIndex, true);
                currentRef.current = bestIndex;
                setActiveIndex(idx);
                // restart auto after interval to avoid immediate override
                setTimeout(() => startAuto(), autoSlideInterval);
              } else {
                setActiveIndex(idx);
              }
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
