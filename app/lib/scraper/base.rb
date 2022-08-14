require 'open-uri'

module Scraper
  class Base
    attr_reader :crawler
    
    def initialize(product_id)
      @product = Product.find product_id
      @crawler = Nokogiri::HTML(URI.open(@product.url))
      scrape
    end

    def scrape_and_save!
      category = Category.find_or_create_by(name: scraped_data[:category])
      @product.categories << category
      scraped_data[:images].each do |image|
        downloaded_image = URI.parse(image).open
        @product.images.attach(io: downloaded_image, filename: scraped_data[:title])
      end;nil
      @product.update!(scraped_data.except(:category, :images))
    end

  end
end