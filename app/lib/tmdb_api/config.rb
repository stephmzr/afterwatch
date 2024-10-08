# frozen_string_literal: true

module TmdbApi
  BASE_URL = 'https://api.themoviedb.org/3'
  BASE_LANGUAGE = 'fr-FR'
  API_KEY = Rails.application.credentials.tmdb_api_key
end
