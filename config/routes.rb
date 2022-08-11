# frozen_string_literal: true

Rails.application.routes.draw do
  root to: redirect('/products')

  get 'products', to: 'home#index'
  get 'products/new', to: 'home#index'
  get 'products/:id', to: 'home#index'
  get 'products/:id/edit', to: 'home#index'

  namespace :api do
    resources :products, only: %i[index show create destroy update]
  end
end
