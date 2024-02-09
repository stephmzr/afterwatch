# frozen_string_literal: true

module Types
  class AttachmentType < BaseObject
    field :id, ID, null: false, description: 'Id of attachment'

    field :content_type, String, null: true, description: 'Content type of attachment'

    field :filename, String, null: true, description: 'Filename of the attachment'

    field :url, String, null: false, description: 'Url of the attachment'
    def url
      Rails.application.routes.url_helpers.rails_blob_url(object)
    end

    def content_type
      object.blob&.content_type
    end

    def filename
      object.blob&.filename
    end
  end
end
