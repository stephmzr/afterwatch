# frozen_string_literal: true

module Mutations
  module Users
    class UpdateProfile < BaseMutation
      description 'Current user updates his profile'

      field :flash_messages, [Types::JsonType], null: false
      field :user, ::Types::Users::UserType, null: true

      argument :attributes, InputObject::UserAttributes, required: true

      def authorized?(id:, attributes:)
        user = context[:current_user]
        context[:current_user].can?(:update, user)
      end

      def resolve(attributes:)
        user = context[:current_user]
        ctx = ::Users::UpdateUser.call(attributes:, user:)
        {
          user: ctx.user,
          flash_messages: [
            {
              type: 'success',
              message: I18n.t(:'flashes.users.update_profile.success')
            }
          ]
        }
      end
    end
  end
end
