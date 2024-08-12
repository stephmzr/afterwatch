# frozen_string_literal: true

module InputObject
  class MediasOptionsAttributes < AttributesInputObject
    description 'Options to add to the media query'

    argument :credits, Boolean, required: false
    argument :watch_providers, Boolean, required: false
  end
end
