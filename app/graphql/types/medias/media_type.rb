module Types
  module Medias
    class MediaType < Types::BaseUnion
      possible_types Types::Movies::MovieType, Types::TvShows::TvShowType

      def self.resolve_type(object, context)
        case object['media_type']
        when 'movie'
          Types::Movies::MovieType
        when 'tv'
          Types::TvShows::TvShowType
        else
          raise "Unknown media_type: #{object['media_type']}"
        end
      end
    end
  end
end

