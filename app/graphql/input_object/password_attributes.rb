# frozen_string_literal: true

module InputObject
  class PasswordAttributes < AttributesInputObject
    description 'Password'

    argument :current_password, String, required: false
    argument :password, String, required: false
    argument :password_confirmation, String, required: false
  end
end
