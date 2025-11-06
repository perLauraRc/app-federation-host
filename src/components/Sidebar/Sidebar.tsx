import { useEffect, useRef } from 'react'

import IconButton from 'remoteApp/IconButton'
import { MenuIcon } from 'remoteApp/MenuIcon'

export interface SidebarProps {
  children: React.ReactNode
  // onRetractBack: () => void
  onRetractBack: () => void
  retracted: boolean
  side?: 'left' | 'right'
}

export const Sidebar = ({
  children,
  onRetractBack,
  // onClose,
  retracted,
  side = 'left'
}: SidebarProps) => {
  const containerRef = useRef<HTMLElement | null>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  // Focus management for keyboard navigation
  // Stores trigger element when sidebar expands so it is restored as the focused element when it retracts back
  useEffect(() => {
    if (!retracted) {
      // Store the currently focused element (the trigger element)
      previousActiveElement.current = document.activeElement as HTMLElement
      // Focus the sidebar when it opens for immediate keyboard navigation
      setTimeout(() => {
        containerRef.current?.focus()
      }, 100)
    } else {
      // Return focus to the trigger element when retracting back
      previousActiveElement.current?.focus()
    }
  }, [retracted])

  // Keyboard navigation
  // Handle escape key to close sidebar
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !retracted) {
        onRetractBack()
      }
    }
    if (!retracted) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => document.removeEventListener('keydown', handleEscape)
  }, [retracted, onRetractBack])

  return (
    <>
      {!retracted && (
        <div
          className="z-gridCellHovered fixed top-0 left-0 h-screen w-screen bg-black/70"
          data-testid="sidebar-backdrop"
          onClick={onRetractBack}
        />
      )}
      <aside
        className={`z-gridCellHovered fixed top-0 ${
          side === 'left' ? 'left-0' : 'right-0'
        } h-screen ${
          retracted ? 'w-14 lg:w-16' : 'w-40'
        } bg-cerulean border-cerulean/50 flex flex-col gap-3 p-3 transition-[width] duration-300 ease-in-out lg:gap-4 lg:p-4`}
        data-testid="sidebar-container"
        ref={containerRef}
        tabIndex={-1}
      >
        <IconButton
          onClick={onRetractBack}
          color={'var(--color-powder-blue)'}
          size="2rem"
        >
          <MenuIcon />
        </IconButton>
        <nav className="w-full">{children}</nav>
      </aside>
    </>
  )
}
