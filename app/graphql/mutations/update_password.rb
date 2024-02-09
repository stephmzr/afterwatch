# frozen_string_literal: true

module Mutations
  class UpdatePassword < BaseMutation
    null false

    field :flash_messages, [Types::JsonType], null: false
    field :success, Boolean, null: false

    argument :attributes, InputObject::PasswordAttributes, required: true

    def authorized?(id:, attributes:)
      context[:current_user].can?(:update, context[:current_user])
    end

    def resolve(attributes:)
      user = context[:current_user]
      user.update_with_password(attributes)
      if user.errors.blank?
        {
          success: true,
          flash_messages: [
            {
              type: 'success',
              message: 'Votre mot de passe a bien été modifié'
            }
          ]
        }
      else
        {
          success: false,
          flash_messages: [
            {
              type: 'error',
              message: 'Une erreur est survenue'
            }
          ]
        }
      end
    end
  end
end
