Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'
      namespace :auth do
        resources :sessions, only: [:index]
      end
      get :health_check, to: 'health_check#index'
    end
  end
end
