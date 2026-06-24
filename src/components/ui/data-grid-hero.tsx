import React, { useEffect, useRef, ReactNode, HTMLAttributes } from "react";

interface DataGridHeroProps extends HTMLAttributes<HTMLDivElement> {
  rows?: number;
  cols?: number;
  spacing: number;
  duration: number;
  color: string;
  animationType: "pulse" | "wave" | "random";
  pulseEffect: boolean;
  mouseGlow: boolean;
  opacityMin: number;
  opacityMax: number;
  background: string;
  children?: ReactNode;
  contentClassName?: string;
}

export default function DataGridHero({
  rows,
  cols,
  spacing,
  duration,
  color,
  animationType,
  pulseEffect,
  mouseGlow,
  opacityMin,
  opacityMax,
  background,
  children,
  className = "",
  style = {},
  contentClassName = "",
  ...rest
}: DataGridHeroProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = gridRef.current;
    if (!container) return;

    const renderGrid = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      // Target size for a cell is around 40px
      const targetSize = 40;
      const computedCols = cols && cols > 0 ? cols : Math.max(10, Math.floor(width / targetSize));
      const computedRows = rows && rows > 0 ? rows : Math.max(10, Math.floor(height / targetSize));

      container.innerHTML = "";
      container.style.gridTemplateColumns = `repeat(${computedCols}, 1fr)`;
      container.style.gridTemplateRows = `repeat(${computedRows}, 1fr)`;
      container.style.gap = `${spacing}px`;
      container.style.setProperty("--mouse-glow-opacity", mouseGlow ? "1" : "0");

      const total = computedRows * computedCols;
      const centerRow = Math.floor(computedRows / 2);
      const centerCol = Math.floor(computedCols / 2);

      for (let i = 0; i < total; i++) {
        const cell = document.createElement("div");
        cell.className = "grid-cell";
        cell.style.backgroundColor = color;
        cell.style.setProperty("--opacity-min", String(opacityMin));
        cell.style.setProperty("--opacity-max", String(opacityMax));

        if (pulseEffect) {
          let delay: number;
          const r = Math.floor(i / computedCols);
          const c = i % computedCols;

          if (animationType === "wave") {
            delay = (r + c) * 0.05; // Slightly faster wave scaling for responsive grid sizes
          } else if (animationType === "random") {
            delay = Math.random() * duration;
          } else {
            const dr = Math.abs(r - centerRow);
            const dc = Math.abs(c - centerCol);
            delay = Math.sqrt(dr * dr + dc * dc) * 0.15;
          }

          cell.style.animation = `cell-pulse ${duration}s infinite alternate`;
          cell.style.animationDelay = `${delay.toFixed(3)}s`;
        }

        container.appendChild(cell);
      }
    };

    renderGrid();

    // Responsive observer to recalculate when the container dimensions change
    const resizeObserver = new ResizeObserver(() => {
      renderGrid();
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [
    rows,
    cols,
    spacing,
    color,
    animationType,
    pulseEffect,
    duration,
    opacityMin,
    opacityMax,
    mouseGlow,
  ]);

  useEffect(() => {
    if (!mouseGlow || !gridRef.current) return;
    const handler = (e: MouseEvent) => {
      const rect = gridRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gridRef.current!.style.setProperty("--mouse-x", `${x}px`);
      gridRef.current!.style.setProperty("--mouse-y", `${y}px`);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseGlow]);

  return (
    <div
      className={`data-grid-hero ${className}`}
      style={{
        background: "transparent",
        ...style,
      }}
      {...rest}
    >
      <div
        ref={gridRef}
        className="grid-container"
        aria-hidden="true"
        style={{ zIndex: 1, background: "transparent" }}
      />
      <div
        className={`hero-content ${contentClassName}`}
        role="region"
        aria-label="Hero Content"
        style={{ zIndex: 2 }}
      >
        {children}
      </div>
    </div>
  );
}
