# frozen_string_literal: true

module InputObject
  class SearchMediasAttributes < AttributesInputObject
    description 'Medias search attributes'

    argument :query, String, required: false
  end
end
