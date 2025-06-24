module TmdbApi
  module Response
    class Credit
      attr_accessor :crew, :cast, :id

      def initialize(data = {})
        @id = data[:id]
        @cast = data[:cast] || []
        @crew = data[:crew] || []
      end

      def director
        @crew.find { |member| member.job == 'Director' }
      end

      def main_cast(limit = 6)
        @cast.first(limit)
      end

      def department_crew(department)
        @crew.select { |member| member.department == department }
      end
    end
  end
end
