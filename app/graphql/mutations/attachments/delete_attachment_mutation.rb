# frozen_string_literal: true

module Mutations
  module Attachments
    class DeleteAttachmentMutation < BaseMutation
      null true

      argument :attachment_id, ID, required: true

      field :attachment, Types::AttachmentType, null: false
      field :flash_messages, [Types::JsonType], null: false
      field :persisted, Boolean, null: false

      def authorized?(attachment_id:)
        attachment = ActiveStorage::Attachment.find attachment_id
        parent = attachment.record_type.constantize.find attachment.record_id
        context[:current_user].can?(:destroy, attachment) && (context[:current_user].can?(:update, parent) || context[:current_user].can?(:update_attachments, parent))
      end

      def resolve(attachment_id:)
        attachment = ActiveStorage::Attachment.find attachment_id
        attachment.destroy
        if attachment.persisted?
          {
            attachment:,
            persisted: attachment.persisted?,
            flash_messages: []
          }
        else
          {
            attachment:,
            persisted: attachment.persisted?,
            flash_messages: [{
              type: 'success',
              message: I18n.t('attachments.destroy.success')
            }]
          }
        end
      end
    end
  end
end
