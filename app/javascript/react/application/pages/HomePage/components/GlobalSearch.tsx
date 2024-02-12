import { Autocomplete } from "@mui/material"
import MuiSearchInput from "../../../components/MuiComponents/MuiSearchInput";
import React from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import useI18n from "@/utils/useI18n";

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
];

const SEARCH_MOVIES = gql`
  query movies($search: SearchMoviesAttributes!) {
    movies(search: $search) {
      id
      title
      overview
    }
  }
`;


const GlobalSearch = () => {
  const { t } = useI18n();
  const [getMovies, { data }] = useLazyQuery(SEARCH_MOVIES);
  
  const handleInputChange = (event, newInputValue) => {
    console.log(event, newInputValue)
    getMovies({ variables: { search: { query: newInputValue } } });
  };

  const movieOptions = data?.movies.map((movie) => ({
    label: movie.title,
    value: movie.id
  })) || [];

  console.log(movieOptions)
  return (
    <Autocomplete
      disablePortal
      id="search-movie"
      options={movieOptions}
      onInputChange={handleInputChange}
      noOptionsText={t('sentences.no_movies_found')}
      renderInput={(params) => <MuiSearchInput {...params} label={t('sentences.search_movie')} />}
    />
  )
}

export default GlobalSearch;