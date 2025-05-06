module TmdbApi
  module Response
    class Actor
      attr_writer :client
      attr_accessor :id, :name, :profile_path, :character

      def self.prepare(json_response)
        actor = new
        json_response.each do |key, value|
          actor.send("#{key}=", value) if actor.respond_to?("#{key}=")
        end
        actor
      end
    end
  end
end