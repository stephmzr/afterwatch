# :nocov:
require 'sidekiq'
require 'jobs_dashboard'

Sidekiq.configure_server do |config|
  config.redis = { :url => (ENV["REDIS_URL"] || 'redis://localhost:6379/0')}

  # accepts :expiration (optional)
  JobsDashboard.configure_server_middleware config

  # accepts :expiration (optional)
  JobsDashboard.configure_client_middleware config
end

Sidekiq.configure_client do |config|
  config.redis = { :url => (ENV["REDIS_URL"] || 'redis://localhost:6379/0')}

  # accepts :expiration (optional)
  JobsDashboard.configure_client_middleware config
end
# :nocov: