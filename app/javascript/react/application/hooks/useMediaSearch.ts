import { useState, useCallback } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { debounce } from 'lodash'
import { type MediaType } from '@/react/types'

const SEARCH_MEDIAS = gql`
  query medias($search: SearchMediasAttributes!, $perPage: Int) {
    medias(search: $search, perPage: $perPage) {
      ... on Movie {
        id
        title: title
        originalTitle
        posterPath
        releaseDate
      }
      ... on Tv {
        id
        title: name
        originalTitle: originalName
        posterPath
        releaseDate: firstAirDate
      }
    }
  }
`

interface UseMediaSearchOptions {
  perPage?: number
  debounceMs?: number
}

interface UseMediaSearchReturn {
  searchValue: string
  setSearchValue: (value: string) => void
  results: Array<MediaType & { __typename: string, originalTitle?: string }>
  loading: boolean
  error: any
  clearSearch: () => void
  performSearch: (query: string) => void
}

export const useMediaSearch = (options: UseMediaSearchOptions = {}): UseMediaSearchReturn => {
  const { perPage = 6, debounceMs = 300 } = options

  const [searchValue, setSearchValue] = useState('')
  const [getMedias, { data, loading, error }] = useLazyQuery(SEARCH_MEDIAS)

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim().length > 0) {
        getMedias({ variables: { search: { query: query.trim() }, perPage } })
      }
    }, debounceMs),
    [getMedias, perPage, debounceMs]
  )

  const performSearch = useCallback((query: string) => {
    setSearchValue(query)
    debouncedSearch(query)
  }, [debouncedSearch])

  const clearSearch = useCallback(() => {
    setSearchValue('')
    debouncedSearch.cancel()
  }, [debouncedSearch])

  return {
    searchValue,
    setSearchValue,
    results: data?.medias || [],
    loading,
    error,
    clearSearch,
    performSearch
  }
} 