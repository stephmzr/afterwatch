module TmdbApi
  module Response
    class CrewMember
      attr_reader :id, :name, :profile_path, :job, :department, :gender

      def initialize(data = {})
        @id = extract_and_validate_id(data['id'])
        @name = extract_and_validate_name(data['name'])
        @profile_path = normalize_profile_path(data['profile_path'])
        @job = normalize_job(data['job'])
        @department = data['department']&.strip
        @gender = normalize_gender(data['gender'])
      end

      # Maintenir la rétrocompatibilité avec la méthode prepare
      def self.prepare(json_response)
        new(json_response)
      end

      def director?
        @job == 'Director'
      end

      def producer?
        @job&.downcase&.include?('producer') || false
      end

      def writer?
        %w[Writer Screenplay Story].include?(@job)
      end

      def full_profile_url(size: 'w185')
        return nil unless @profile_path
        "#{TmdbApi::Config.image_base_url}/#{size}#{@profile_path}"
      end

      def to_h
        {
          id: @id,
          name: @name,
          profile_path: @profile_path,
          job: @job,
          department: @department,
          gender: @gender
        }
      end

      private

      def extract_and_validate_id(id)
        return nil if id.nil?

        id_int = id.to_i
        raise ArgumentError, 'Crew member ID must be positive' unless id_int > 0

        id_int
      end

      def extract_and_validate_name(name)
        cleaned_name = name&.strip
        raise ArgumentError, 'Crew member name is required' if cleaned_name.blank?

        cleaned_name
      end

      def normalize_profile_path(path)
        return nil if path.blank?

        path.start_with?('/') ? path : "/#{path}"
      end

      def normalize_job(job)
        job&.strip&.titleize
      end

      def normalize_gender(gender)
        case gender
        when 1 then 'female'
        when 2 then 'male'
        when 3 then 'non-binary'
        else 'unknown'
        end
      end
    end
  end
end
