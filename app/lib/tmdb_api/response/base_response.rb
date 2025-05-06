module TmdbApi
  module Response
    class BaseResponse < OpenStruct

      attr_writer :client

      def client
        @client || TmdbApi::Client
      end

      def self.prepare(data)
        new(data)
      end
    end
  end
end
