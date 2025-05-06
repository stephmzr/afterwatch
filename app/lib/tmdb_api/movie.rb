module TmdbApi
  class Movie < BaseMedia
    private

    def media_type
      'movie'
    end

    def popular_endpoint
      '/movie/popular'
    end

    def trending_endpoint
      '/trending/movie/'
    end

    def response_class
      TmdbApi::Response::Movie
    end
  end
end
