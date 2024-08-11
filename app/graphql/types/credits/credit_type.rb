module Types
  module Credits
    class CreditType < Types::BaseObject
      field :cast, [Types::Credits::CastType]

      field :crew, [Types::Credits::CrewType]

      field :id, ID

      def id
        object['id']
      end

      def cast
        object.fetch('cast', []).first(6)
      end

      def crew
        object.fetch('crew', []).first(5)
      end

      field :director, Types::Credits::CrewType
      def director
        object['crew'].find { |crew| crew['job'] == 'Director' }
      end
    end
  end
end
