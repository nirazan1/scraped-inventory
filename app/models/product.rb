class Product < ApplicationRecord
	has_and_belongs_to_many :categories
	has_many_attached :images, dependent: :destroy

	def product_images
    images.map do |image|
      Rails.application.routes.url_helpers.rails_blob_url(image, only_path: true) if images.attached?
    end
  end
end