# frozen_string_literal: true

class Api::CategoriesController < ApplicationController
  before_action :set_category, only: %i[show update destroy]

  def index
    @categories = Category.all
    render json: @categories, :include => {:products => {:methods => :product_images,
      :only => [:id, :url, :title, :size, :description, :price, :mobile_number, :product_images]}},
      :except => [:created_at, :updated_at]
  end

  def show
    render json: @category
  end

  private

  def set_category
    @category = Category.find(params[:id])
  end

end
