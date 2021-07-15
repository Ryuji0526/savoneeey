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
      resources :tags, only: [] do
        get :wish_tags, on: :collection
      end
      resources :registerings, only: [] do
        post :register, on: :collection
        delete :unregister, on: :collection
      end
    end
  end
end
