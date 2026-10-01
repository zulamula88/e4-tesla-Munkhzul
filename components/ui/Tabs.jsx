"use client";

import { useId, useRef, useState } from "react";

export default function Tabs({
  ariaLabel = "Tabs",
  defaultValue,
  items
}) {
  const baseId = useId();
  const initialValue = defaultValue || items[0]?.value;
  const [activeValue, setActiveValue] = useState(initialValue);
  const tabRefs = useRef([]);
  const activeItem = items.find((item) => item.value === activeValue) || items[0];

  function selectTab(index) {
    const nextItem = items[index];
    if (!nextItem) return;

    setActiveValue(nextItem.value);
    tabRefs.current[index]?.focus();
  }

  function handleKeyDown(event, index) {
    let nextIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % items.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + items.length) % items.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = items.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    selectTab(nextIndex);
  }

  return (
    <div className="flex w-full flex-col items-center">
      <h1
        className="text-center text-[64px] leading-[1.08] font-medium tracking-[-0.64px] text-ink max-[600px]:text-5xl max-[600px]:tracking-[-0.48px]"
        id={`${baseId}-heading`}
      >
        {activeItem.heading}
      </h1>

      <div
        className="mt-10 grid w-full max-w-[640px] grid-cols-3 rounded-2xl bg-black/[0.055] p-2 max-[600px]:mt-8 max-[600px]:rounded-xl max-[600px]:p-1.5"
        role="tablist"
        aria-label={ariaLabel}
      >
        {items.map((item, index) => {
          const isActive = item.value === activeValue;
          const tabId = `${baseId}-tab-${item.value}`;
          const panelId = `${baseId}-panel-${item.value}`;

          return (
            <button
              className={`motion-control tap-transparent min-h-20 cursor-pointer rounded-lg px-6 py-4 text-[22px] leading-7 font-semibold transition-[background-color,color,box-shadow,transform] duration-160 focus-visible:z-10 max-[600px]:min-h-16 max-[600px]:px-2 max-[600px]:py-3 max-[600px]:text-sm ${
                isActive
                  ? "bg-white text-ink shadow-[0_1px_2px_rgba(3,4,12,0.06)]"
                  : "text-black/60 hover:bg-white/45 hover:text-ink"
              }`}
              id={tabId}
              key={item.value}
              onClick={() => setActiveValue(item.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              role="tab"
              type="button"
              aria-controls={panelId}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item) => (
        <div
          className="sr-only"
          id={`${baseId}-panel-${item.value}`}
          key={item.value}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${item.value}`}
          hidden={item.value !== activeValue}
        >
          {item.panelLabel || item.heading}
        </div>
      ))}
    </div>
  );
}
