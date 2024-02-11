# frozen_string_literal: true

module InputObject
  class SearchMoviesAttributes < AttributesInputObject
    description 'Movies search attributes'

    argument :query, String, required: false
  end
end
