module Types
  module Medias
    class GenreType < Types::BaseObject
      field :id, ID
      field :name, String
    end

    class MediaType < Types::BaseUnion
      possible_types Types::Movies::MovieType, Types::TvShows::TvType

      def self.resolve_type(object, context)
        case object.media_type
        when 'movie'
          Types::Movies::MovieType
        when 'tv'
          Types::TvShows::TvType
        else
          raise "Unknown media_type: #{object['media_type']}"
        end
      end
    end
  end
end
