# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.1.1'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails', branch: 'main'
gem 'rails', '~> 7.0.0'
gem 'rails_12factor'
gem 'rails-i18n'

gem 'slim'
gem 'slim-rails'

gem 'sprockets-rails'
# Use mysql as the database for Active Record
gem 'mysql2', '~> 0.5.6'
# Use Puma as the app server
gem 'puma', '~> 5.0'
# Use SCSS for stylesheets
gem 'sass-rails', '>= 6'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.7'
# Use Redis adapter to run Action Cable in production
gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Reduces boot times through caching; required in config/boot.rb
gem 'annotate'
gem 'apollo_upload_server', '~> 2.0.0'
gem 'aws-sdk-s3', require: false
gem 'bootsnap', '>= 1.4.4', require: false
gem 'countries', '~> 5.0.1'
gem 'faker'
gem 'geocoder'
gem 'goldiloader'
gem 'graphql', '<2'
gem 'graphql-batch'
gem 'concurrent-ruby'
gem 'httparty'
gem 'kaminari'
gem 'ransack'
gem 'strip_attributes'
# Use Redis adapter to run Action Cable in production
gem 'sidekiq'
gem 'sidekiq-scheduler'
gem 'sidekiq-status'

# gem 'jobs_dashboard', path: "../jobs_dashboard"
gem 'jobs_dashboard'

gem 'paper_trail'
gem 'simple_form'

gem 'mjml-rails'

gem 'appsignal', '~> 3.0'
# Use Active Storage variant
gem 'image_processing', '~> 1.2'

gem 'cancancan'
gem 'devise'
gem 'devise_invitable'

gem 'interactor-rails'
gem 'rack-cors'

# XLSX Export
gem 'caxlsx'
gem 'caxlsx_rails'

# Import
gem 'activerecord-import'
gem 'roo'

gem 'ntq_excelsior'

gem 'ntq_tools'
gem 'react_on_rails', '13.0.1'
gem 'vite_rails'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'factory_bot_rails'
  gem 'mini_racer', platforms: :ruby
  gem 'rspec-rails', '~> 5.0.0'
end

group :development do
  gem 'rubocop'
  gem 'rubocop-graphql'
  gem 'rubocop-rails'

  # gem 'ntq_tools', path: "../ntq_tools"

  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 4.1.0'
  # Display performance information such as SQL time and flame graphs for each request in your browser.
  gem 'listen', '~> 3.3'
  gem 'pry-rails'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end

group :test do
  gem 'database_cleaner-active_record', '~> 1.99'
  gem 'simplecov', require: false
  gem 'simplecov-cobertura'
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 3.26'
  gem 'selenium-webdriver'
  # Easy installation and use of web drivers to run system tests with browsers
  gem 'webdrivers'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'graphiql-rails', group: :development
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
