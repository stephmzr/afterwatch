import { Backdrop, Box, Typography } from '@mui/material'
import MuiSearchInput from '@components/MuiComponents/MuiSearchInput'
import React, { useCallback, useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import useI18n from '@/utils/useI18n'
import { type MediaType } from '@/react/types'
import './GlobalSearch.sass'
import MuiAutocomplete from '@components/MuiComponents/MuiAutocomplete'
import { useNavigate } from 'react-router-dom'
import MediaImage from '../../../components/MediaImage'
import dayjs from '@/utils/dayjs'
import { debounce } from 'lodash'

const SEARCH_MEDIAS = gql`
  query medias($search: SearchMediasAttributes!, $perPage: Int) {
    medias(search: $search, perPage: $perPage) {
      ... on Movie {
        id  
        title: title
        posterPath
        releaseDate
      }
      ... on Tv {
        id
        title: name
        posterPath
        releaseDate: firstAirDate
      }
    }
  }
`

const GlobalSearch = (): JSX.Element => {
  const { t } = useI18n()
  const history = useNavigate()
  const [getMedias, { data }] = useLazyQuery(SEARCH_MEDIAS)
  const [open, setOpen] = useState<boolean>(false)

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      getMedias({ variables: { search: { query } } })
    }, 300),
    []
  )

  const handleInputChange = (event, newInputValue): void => {
    debouncedSearch(newInputValue)
  }

  const mediaOptions = data?.medias.map((media: MediaType & { __typename: string }) => ({
    label: media.title,
    value: media.id,
    posterPath: media.posterPath,
    releaseDate: media.releaseDate,
    type: media.__typename
  }))

  return (
    <>
      <Backdrop open={open} style={{ color: '#fff', zIndex: 1 }} />
      <Box className='flex align-items-center autocomplete-wrapper'>
        <MuiAutocomplete
          classes={{ root: 'global-search-input', listbox: 'listbox-search-input' }}
          disablePortal
          id="search-media"
          options={mediaOptions ?? []}
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
          renderOption={(props, option: Partial<MediaType> & { label?: string, value?: string }) => (
            <Box className='media-item' onClick={() => { history(`/medias/${option.type?.toLocaleLowerCase()}/${option.value}`) }} component="li" sx={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
              <MediaImage imageUrl={option?.posterPath} title={option.title} height='84px' borderRadius={12} renderType='w500'/>
              <Typography variant="subtitle1" component="div" className='is-bold' style={{ marginLeft: 8 }}>
                {option.label ?? ''} ({dayjs(option?.releaseDate, 'DD/MM/YYYY').year()})
              </Typography>
            </Box>
          )}
        />
      </Box>

    </>
  )
}

export default GlobalSearch
