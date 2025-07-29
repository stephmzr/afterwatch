import { useState, useCallback, useEffect } from 'react'
import { debounce } from 'lodash'

interface UseActivityPopoverReturn {
  anchorEl: HTMLElement | null
  hoveredMovieId: string | null
  handlePopoverOpen: (event: React.MouseEvent<HTMLElement>, movieId: string) => void
  handlePopoverClose: () => void
}

export const useActivityPopover = (): UseActivityPopoverReturn => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [hoveredMovieId, setHoveredMovieId] = useState<string | null>(null)

  const debouncedSetAnchorEl = useCallback(
    debounce((element: HTMLElement | null) => {
      setAnchorEl(element)
    }, 500),
    []
  )

  useEffect(() => {
    return () => {
      debouncedSetAnchorEl.cancel()
    }
  }, [debouncedSetAnchorEl])

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, movieId: string): void => {
    setHoveredMovieId(movieId)
    debouncedSetAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = (): void => {
    setHoveredMovieId(null)
    debouncedSetAnchorEl(null)
  }

  return {
    anchorEl,
    hoveredMovieId,
    handlePopoverOpen,
    handlePopoverClose
  }
} 