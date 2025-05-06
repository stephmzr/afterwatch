# frozen_string_literal: true

module TmdbApi
  BASE_URL = 'https://api.themoviedb.org/3'
  BASE_REGION = 'FR'
  BASE_LANGUAGE = 'fr-FR'
  DEFAULT_TIME_WINDOW = 'week'
  API_KEY = Rails.application.credentials.tmdb_api_key
end
