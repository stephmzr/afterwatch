NtqTools.setup do |config|

  # Impersonation allow to sign in as user without password or Oauth
  config.impersonation_enabled = true
  config.impersonation_user_models = ["User"]

end