import { useEffect, useId, useRef, useState, type ReactNode } from "react";

type Place = {
  top: number;
  left: number;
  flip: boolean;
};

type TipProps = {
  label: string;
  text: string;
  children?: (describedBy?: string) => ReactNode;
};

export function Tip({ label, text, children }: TipProps) {
  const id = useId();
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [place, setPlace] = useState<Place | null>(null);
  const describedBy = place ? id : undefined;

  useEffect(() => {
    if (!place) return;
    const hide = () => setPlace(null);
    window.addEventListener("scroll", hide, true);
    return () => window.removeEventListener("scroll", hide, true);
  }, [place]);

  function show() {
    const rect = anchorRef.current?.getBoundingClientRect();
    if (!rect) return;
    const flip = rect.bottom + 140 > window.innerHeight;
    setPlace({
      top: flip ? rect.top - 8 : rect.bottom + 8,
      left: Math.max(12, Math.min(rect.left, window.innerWidth - 252)),
      flip,
    });
  }

  return (
    <span
      className="tip"
      ref={anchorRef}
      onMouseEnter={show}
      onMouseLeave={() => setPlace(null)}
      onFocus={show}
      onBlur={() => setPlace(null)}
    >
      {children ? (
        children(describedBy)
      ) : (
        <button
          type="button"
          className="info-button"
          aria-label={`About ${label}`}
          aria-describedby={describedBy}
          onMouseDown={(event) => event.preventDefault()}
        >
          i
        </button>
      )}
      {place ? (
        <span
          id={id}
          role="tooltip"
          className="tooltip"
          style={{
            top: place.top,
            left: place.left,
            translate: place.flip ? "0 -100%" : "0 0",
          }}
        >
          {text}
        </span>
      ) : null}
    </span>
  );
}
