import { useRef, useEffect } from "react";

interface UseHorizontalScrollOptions {
  scrollSpeed?: number;
  smooth?: boolean;
}

export const useHorizontalScroll = (
  options: UseHorizontalScrollOptions = {}
) => {
  const { scrollSpeed = 1, smooth = true } = options;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Предотвращаем вертикальный скролл
      e.preventDefault();

      // Горизонтальный скролл
      const scrollAmount = e.deltaY * scrollSpeed;
      container.scrollLeft += scrollAmount;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!container.contains(document.activeElement)) return;

      const scrollAmount = 200;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          container.scrollLeft -= scrollAmount;
          break;
        case "ArrowRight":
          e.preventDefault();
          container.scrollLeft += scrollAmount;
          break;
        case "Home":
          e.preventDefault();
          container.scrollLeft = 0;
          break;
        case "End":
          e.preventDefault();
          container.scrollLeft = container.scrollWidth;
          break;
      }
    };

    // Добавляем обработчики событий
    container.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("keydown", handleKeyDown);

    // Настройка плавного скролла
    if (smooth) {
      container.style.scrollBehavior = "smooth";
    }

    return () => {
      container.removeEventListener("wheel", handleWheel);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [scrollSpeed, smooth]);

  return containerRef;
};

