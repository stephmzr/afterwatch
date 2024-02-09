ReactOnRails.configure do |config|
  config.i18n_dir = Rails.root.join("app/javascript/", "lang")
  config.i18n_yml_dir = Rails.root.join("config", "locales")
  config.i18n_output_format = 'js'
end