import { useEffect, useState } from "react"

/**
 * Custom hook that tracks the window scroll position.
 *
 * @returns {number} The current vertical scroll offset (in pixels)
 */

export function useScroll(threshold: number = 0): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold])

  return scrolled
}
