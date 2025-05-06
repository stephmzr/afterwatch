module Types
  module Credits
    class CreditType < Types::BaseObject
      field :cast, [Types::Credits::CastType]

      field :full_cast, [Types::Credits::CastType]

      field :crew, [Types::Credits::CrewType]

      field :full_crew, [Types::Credits::CrewType]

      field :id, ID

      field :director, Types::Credits::CrewType

      def cast
        object.cast.first(6)
      end

      def director
        object.crew.find { |crew| crew.job == 'Director' }
      end
    end
  end
end
