import { Backdrop, Box, Typography } from '@mui/material'
import MuiSearchInput from '@components/MuiComponents/MuiSearchInput'
import React, { useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import useI18n from '@/utils/useI18n'
import { type MovieType } from '@/react/types'
import MovieImage from '../../../components/MovieImage'
import './GlobalSearch.sass'
import MuiAutocomplete from '@components/MuiComponents/MuiAutocomplete'
import { useNavigate } from 'react-router-dom'

const SEARCH_MOVIES = gql`
  query movies($search: SearchMoviesAttributes!, $perPage: Int) {
    movies(search: $search, perPage: $perPage) {
      id
      title
      overview
      posterPath
    }
  }
`

const GlobalSearch = (): JSX.Element => {
  const { t } = useI18n()
  const history = useNavigate()
  const [getMovies, { data }] = useLazyQuery(SEARCH_MOVIES)
  const [open, setOpen] = useState<boolean>(false)

  const handleInputChange = (event, newInputValue): void => {
    getMovies({ variables: { search: { query: newInputValue } } })
  }

  const movieOptions = data?.movies.map((movie: MovieType) => ({
    label: movie.title,
    value: movie.id,
    posterPath: movie.posterPath
  }))

  return (
    <>
      <Backdrop open={open} style={{ color: '#fff', zIndex: 1 }} />
      <Box className='flex align-items-center autocomplete-wrapper'>
        <MuiAutocomplete
          classes={{ root: 'global-search-input', listbox: 'listbox-search-input' }}
          disablePortal
          id="search-movie"
          options={movieOptions ?? []}
          open={open}
          onInputChange={(_, value) => {
            // Prevents the dropdown from opening when no value is present yet
            if (value.length === 0) {
              if (open) setOpen(false)
            } else {
              if (!open) setOpen(true)
              handleInputChange(_, value)
            }
          }}
          onClose={() => { setOpen(false) }}
          noOptionsText={t('sentences.no_movies_found')}
          renderInput={(params) => (
            <MuiSearchInput
              {...params}
              label={t('sentences.search_movie')}
            />
          )}
          renderOption={(props, option: Partial<MovieType> & { label?: string, value?: string }) => (
            <Box className='movie-item' onClick={() => { history(`/movies/${option.value}`) }} component="li" sx={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
              <MovieImage imageUrl={option?.posterPath} title={option.title} />
              <Typography variant="subtitle1" component="div" className='is-bold' style={{ marginLeft: 8 }}>
                {option.label}
              </Typography>
            </Box>
          )}
        />
      </Box>

    </>
  )
}

export default GlobalSearch
