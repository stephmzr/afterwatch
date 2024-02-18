module TmdbApi
  class Base
    include HTTParty

    base_uri 'https://api.themoviedb.org/3'
    BASE_LANGUAGE = 'fr-FR'.freeze
    API_KEY = Rails.application.credentials.tmdb_api_key
  end
end
