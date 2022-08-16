# frozen_string_literal: true

Rails.application.routes.draw do
  root to: redirect('/categories')

  get 'categories', to: 'home#index'
  get 'categories/*', to: 'home#index'
  get 'categories/:id', to: 'home#index'
  get 'categories/:id/products/:id', to: 'home#index'
  get 'categories/:id/products/:id/edit', to: 'home#index'

  namespace :api do
    resources :products
    resources :categories
  end
end
