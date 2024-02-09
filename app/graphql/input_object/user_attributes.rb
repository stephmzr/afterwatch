# frozen_string_literal: true

module InputObject
  class UserAttributes < AttributesInputObject
    description 'User attributes'

    argument :active, Boolean, required: false
    argument :email, String, required: false
    argument :first_name, String, required: false
    argument :last_name, String, required: false
    argument :password, String, required: false
    argument :password_confirmation, String, required: false
  end
end
