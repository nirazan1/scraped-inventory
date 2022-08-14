require 'open-uri'

module Scraper
  class Base
    attr_reader :crawler
    
    def initialize(url)
      @crawler = Nokogiri::HTML(URI.open(url))
      scrape!
    end

    def store
      product = Product.create!(scraped_data.except(:category, :images))
      category = Category.find_or_create_by(name: scraped_data[:category])
      product.categories << category
    end

  end
end