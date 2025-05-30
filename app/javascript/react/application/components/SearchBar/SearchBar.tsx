import React, { useState, useCallback, useRef } from 'react'
import {
  Box,
  InputBase,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Fade,
  CircularProgress,
  Typography,
  IconButton
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import { styled, alpha } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { useMediaSearch } from '@/react/application/hooks/useMediaSearch'
import MediaImage from '../MediaImage/MediaImage'
import dayjs from '@/utils/dayjs'
import useI18n from '@/utils/useI18n'
import { type MediaType } from '@/react/types'

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 3,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    borderColor: alpha(theme.palette.common.white, 0.2)
  },
  '&:focus-within': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}`,
    transform: 'translateY(-1px)'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: alpha(theme.palette.common.white, 0.7),
  transition: 'color 0.2s ease'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: theme.spacing(6),
    transition: theme.transitions.create('width'),
    fontSize: '0.95rem',
    fontWeight: 400,
    lineHeight: 1.5,
    '&::placeholder': {
      color: alpha(theme.palette.common.white, 0.6),
      opacity: 1
    },
    '&:focus::placeholder': {
      color: alpha(theme.palette.common.white, 0.4)
    }
  }
}))

const ClearButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  top: '50%',
  transform: 'translateY(-50%)',
  color: alpha(theme.palette.common.white, 0.6),
  padding: theme.spacing(0.5),
  '&:hover': {
    color: alpha(theme.palette.common.white, 0.9),
    backgroundColor: alpha(theme.palette.common.white, 0.1)
  }
}))

const ResultsContainer = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(1),
  maxHeight: 400,
  overflow: 'auto',
  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
  borderRadius: theme.spacing(2),
  border: `1px solid ${alpha(theme.palette.grey[300], 0.2)}`,
  backdropFilter: 'blur(10px)',
  backgroundColor: alpha(theme.palette.background.paper, 0.95)
}))

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  color: theme.palette.text.secondary
}))

const EmptyState = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
  textAlign: 'center'
}))

interface SearchBarProps {
  width?: string | number
  maxWidth?: string | number
  placeholder?: string
  showClearButton?: boolean
  perPage?: number
  onResultClick?: (mediaId: string, mediaType: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({
  width = '100%',
  maxWidth = '400px',
  placeholder,
  showClearButton = true,
  perPage = 6,
  onResultClick
}) => {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  const { searchValue, results, loading, performSearch, clearSearch } = useMediaSearch({
    perPage
  })

  const defaultPlaceholder = placeholder ?? t('sentences.search_movie')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value
    performSearch(value)
    setAnchorEl(event.currentTarget)
  }

  const handleSearchFocus = (event: React.FocusEvent<HTMLInputElement>): void => {
    setIsSearchFocused(true)
    setAnchorEl(event.currentTarget)
  }

  const handleSearchBlur = useCallback((): void => {
    // Delay to allow click on results
    setTimeout(() => {
      setIsSearchFocused(false)
      setAnchorEl(null)
    }, 200)
  }, [])

  const handleClear = useCallback((): void => {
    clearSearch()
    setAnchorEl(null)
    setIsSearchFocused(false)
    searchRef.current?.focus()
  }, [clearSearch])

  const handleMediaClick = useCallback((mediaId: string, mediaType: string): void => {
    if (onResultClick) {
      onResultClick(mediaId, mediaType)
    } else {
      navigate(`/medias/${mediaType.toLowerCase()}/${mediaId}`)
    }
    clearSearch()
    setAnchorEl(null)
    setIsSearchFocused(false)
  }, [onResultClick, navigate, clearSearch])

  const showResults = isSearchFocused && searchValue.length > 0 && (results.length > 0 || loading)

  const renderMediaItem = (media: MediaType & { __typename: string, originalTitle?: string }): JSX.Element => {
    const mediaType = media.__typename === 'Movie' ? 'Film' : 'Série'
    const year = dayjs(media.releaseDate, 'DD/MM/YYYY').year()

    return (
      <ListItem
        key={media.id}
        onClick={() => { handleMediaClick(String(media.id), media.__typename) }}
        sx={{
          py: 2,
          px: 2,
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: 'action.hover',
            transform: 'translateX(4px)'
          },
          '&:not(:last-child)': {
            borderBottom: '1px solid',
            borderBottomColor: 'divider'
          }
        }}
      >
        <ListItemAvatar sx={{ mr: 2 }}>
          <MediaImage
            imageUrl={media.posterPath}
            height='120px'
            width='80px'
            renderType='w500'
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                {media.title}
              </Typography>
              {media.originalTitle && media.originalTitle !== media.title && (
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    fontStyle: 'italic',
                    mb: 0.5
                  }}
                >
                  {media.originalTitle}
                </Typography>
              )}
            </Box>
          }
          secondary={
            <Typography variant="body2" color="text.secondary">
              {year} - {mediaType}
            </Typography>
          }
        />
      </ListItem>
    )
  }

  return (
    <Box sx={{ width, maxWidth, position: 'relative' }}>
      <SearchContainer>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          ref={searchRef}
          placeholder={defaultPlaceholder}
          value={searchValue}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
        />
        {showClearButton && searchValue && (
          <ClearButton onClick={handleClear} size="small">
            <ClearIcon fontSize="small" />
          </ClearButton>
        )}
      </SearchContainer>

      <Popper
        open={showResults}
        anchorEl={anchorEl}
        placement="bottom-start"
        transition
        sx={{
          zIndex: 1300,
          width: anchorEl?.offsetWidth ?? width
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={300}>
            <ResultsContainer>
              {loading
                ? (
                    <LoadingContainer>
                      <CircularProgress size={24} sx={{ mr: 2 }} />
                      <Typography variant="body2">
                        {t('sentences.searching', { defaultValue: 'Recherche en cours...' })}
                      </Typography>
                    </LoadingContainer>
                  )
                : results.length > 0
                  ? (
                      <List disablePadding>
                        {results.map(renderMediaItem)}
                      </List>
                    )
                  : (
                      <EmptyState>
                        <Typography variant="body2">
                          {t('sentences.no_results_found', { defaultValue: 'Aucun résultat trouvé' })}
                        </Typography>
                      </EmptyState>
                    )}
            </ResultsContainer>
          </Fade>
        )}
      </Popper>
    </Box>
  )
}

export default SearchBar 