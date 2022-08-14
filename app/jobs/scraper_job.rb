class ScraperJob
  include Sidekiq::Job

  def perform(*args)
    product = Product.find_by(id: args[0])
    return unless product

    store = URI(product.url).host.split('.')[1].classify
    "Scraper::#{store}".safe_constantize.new(product.id).scrape_and_save!
  end
end
