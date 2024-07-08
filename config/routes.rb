Rails.application.routes.draw do

  get '/status' => "pages#status"
  get '/' => "pages#react"
  get '/404' => "pages#react"
  get '/500' => "pages#react"
  get '/users' => "pages#react"
  get '/medias/:type/:id' => 'pages#react'
  devise_for :users, controllers: { sessions: "sessions", invitations: 'invitations', passwords: 'passwords', registrations: 'registrations' }
  post "/graphql", to: "graphql#execute"
  
end
