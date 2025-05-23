require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Afterwatch
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    config.active_record.yaml_column_permitted_classes = [Symbol]

    config.autoload_paths << Rails.root.join('app/lib')
    config.assets.paths << Rails.root.join('app', 'assets', 'fonts')

    config.i18n.default_locale = :fr
    config.i18n.available_locales = [:fr, :en]

    config.active_job.queue_adapter = :sidekiq
  end
end
