module TmdbApi
  class TvShow < BaseMedia
    private

    def media_type
      'tv'
    end

    def popular_endpoint
      '/tv/popular'
    end

    def trending_endpoint
      '/trending/tv/'
    end

    def response_class
      TmdbApi::Response::TvShow
    end
  end
end
