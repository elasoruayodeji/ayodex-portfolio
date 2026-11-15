"use client";

import { useState } from "react";

/**
 * Copy-to-clipboard with a transient confirmation. Falls back to a hidden
 * textarea + execCommand on browsers without the async clipboard API, and
 * reports failure honestly rather than claiming success.
 */
export function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied",
  className = "",
}: {
  value: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const area = document.createElement("textarea");
        area.value = value;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(area);
        if (!ok) throw new Error("copy failed");
      }
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 2400);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`btn btn-sm ${className}`}
      aria-live="polite"
    >
      {state === "copied" ? (
        <>
          <span aria-hidden="true">✓</span> {copiedLabel}
        </>
      ) : state === "failed" ? (
        "Select and copy manually"
      ) : (
        label
      )}
    </button>
  );
}
