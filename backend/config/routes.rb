Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }
      namespace :auth do
        resources :sessions, only: [:index]
      end
      get :health_check, to: 'health_check#index'
      resources :accounts, except: [:edit]
      resources :trading_histories, only: [:index, :create]
      resources :wish_lists, except: [:edit, :show]
    end
  end
end
