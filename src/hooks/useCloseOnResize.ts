import { useEffect } from "react"

/**
 * Custom hook to handle component close behavior on window resize.
 *
 * Useful for closing menus, dialogs, or sidebars when the viewport changes.
 *
 * @param onClose - Callback function executed when the window is resized
 */


export function useCloseOnResize(
  isOpen: boolean,
  onClose: () => void,
  breakpoint: number = 768
): void {
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= breakpoint && isOpen) {
        onClose()
      }
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [isOpen, onClose, breakpoint])
}
