import { Box } from "@mui/material";
import { type ReactNode, useEffect, useRef, useState } from "react";

type FeaturedCarouselProps<T> = {
  items: T[];
  getKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  intervalMs?: number;
};

export function FeaturedCarousel<T>({
  items,
  getKey,
  renderItem,
  intervalMs = 4000,
}: FeaturedCarouselProps<T>) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % items.length),
      intervalMs,
    );
    return () => window.clearInterval(timer);
  }, [paused, items.length, intervalMs]);

  useEffect(() => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (track && slide)
      track.scrollTo({
        left: slide.offsetLeft - track.offsetLeft,
        behavior: "smooth",
      });
  }, [index]);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || !paused) return;
    const slideWidth = (track.children[0] as HTMLElement | undefined)?.offsetWidth ?? 1;
    setIndex(Math.round(track.scrollLeft / slideWidth));
  };

  return (
    <Box>
      <Box
        ref={trackRef}
        onScroll={handleScroll}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {items.map((item) => (
          <Box key={getKey(item)} sx={{ flex: "0 0 100%", minWidth: 0, scrollSnapAlign: "start" }}>
            {renderItem(item)}
          </Box>
        ))}
      </Box>

      {items.length > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 0.75, mt: 1.5 }}>
          {items.map((item, dot) => (
            <Box
              key={getKey(item)}
              component="button"
              type="button"
              aria-label={`Ir para o destaque ${dot + 1}`}
              onClick={() => setIndex(dot)}
              sx={{
                width: dot === index ? 22 : 8,
                height: 8,
                p: 0,
                border: 0,
                borderRadius: "999px",
                cursor: "pointer",
                bgcolor: dot === index ? "#16A34A" : "#DFE2EC",
                transition: "all .2s",
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
