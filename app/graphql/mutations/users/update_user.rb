# frozen_string_literal: true

module Mutations
  module Users
    class UpdateUser < BaseMutation
      description 'User updates a user profile'

      field :flash_messages, [Types::JsonType], null: false
      field :user, ::Types::Users::UserType, null: true

      argument :attributes, InputObject::UserAttributes, required: true
      argument :id, ID, required: true

      def authorized?(id:, attributes:)
        user = ::User.find id
        context[:current_user].can?(:update, user)
      end

      def resolve(id:, attributes:)
        user = ::User.find id
        user.current_user = context[:current_user]
        ctx = ::Users::UpdateUser.call(attributes:, user:)
        {
          user: ctx.user,
          flash_messages: [
            {
              type: 'success',
              message: I18n.t(:'flashes.users.update_user.success')
            }
          ]
        }
      end
    end
  end
end
