require 'jobs_dashboard/engine'
Rails.application.routes.draw do
  if Rails.env.development?
    mount NtqTools::Engine => "/ntq_tools"
  end

  get '/status' => "pages#status"
  get '/' => "pages#react"
  get '/404' => "pages#react"
  get '/500' => "pages#react"
  get '/users' => "pages#react"
  devise_for :users, controllers: { sessions: "sessions", invitations: 'invitations', passwords: 'passwords', registrations: 'registrations' }
  post "/graphql", to: "graphql#execute"
  
  mount JobsDashboard::Engine, at: '/jobs_dashboard'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
