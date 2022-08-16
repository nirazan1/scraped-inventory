# frozen_string_literal: true

class Api::ProductsController < ApplicationController
  before_action :set_product, only: %i[show update destroy]

  def index
    @products = Product.all
    render json: @products, :only => [:id, :url, :title]
  end

  def show
    render json: @product, methods: :product_images, :include => {
        :categories => {:only => [:id, :name]}
      }, :except => [:created_at, :updated_at]
  end

  def create
    @product = Product.new(product_params)

    if @product.save
      render json: @product, :include => {
          :categories => {:only => [:id, :name]}
        }, :except => [:created_at, :updated_at] , status: :created
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def update
    if @product.update(product_params)
      render json: @product, status: :ok
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @product.destroy
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.require(:product).permit(:id, :url)
  end
end
