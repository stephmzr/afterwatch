# frozen_string_literal: true

module Mutations
  module Users
    class CreateUser < BaseMutation
      description 'User create'

      field :flash_messages, [Types::JsonType], null: false
      field :user, ::Types::Users::UserType, null: true

      argument :attributes, InputObject::UserAttributes, required: true

      def authorized?(attributes:)
        context[:current_user].can?(:create, User)
      end

      def resolve(attributes:)
        ctx = ::Users::CreateUser.call(
          attributes: attributes,
          creator: context[:current_user]
        )
        {
          user:,
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
