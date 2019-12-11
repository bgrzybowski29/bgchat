Rails.application.routes.draw do
  resources :users
  get 'password_resets/new'
  post '/auth/login', to: 'authentication#login'
  post '/auth/resetpassword', to: 'authentication#update_password'
  put 'password_resets/new', to: 'password_resets#new'
  get '/auth/verify', to: 'authentication#verify'
  resources :password_resets

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
