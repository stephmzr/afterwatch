module TmdbApi
  module Error
    class Error < StandardError; end

    class ClientError < Error; end
    class NotFoundError < Error; end
    class ServerError < Error; end
    class InvalidResponseError < Error; end
  end
end
