class Product < ApplicationRecord
	has_and_belongs_to_many :categories
	has_many_attached :images, dependent: :destroy
  after_commit :scrape, if: Proc.new {|record| record.persisted? && record.previous_changes.has_key?('url')}

	def product_images
    images.map do |image|
      Rails.application.routes.url_helpers.rails_blob_url(image, only_path: true) if images.attached?
    end
  end

  private

  def scrape
   	ScraperJob.perform_in(3.seconds, id)
  end
end