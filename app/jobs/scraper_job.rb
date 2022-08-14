class ScraperJob
  include Sidekiq::Job
  include Sidekiq::Lock::Worker
  sidekiq_options lock: {
    timeout: proc { |args| 3000 },
    name:    proc { |args| "lock:perproduct:#{args[0]}" },
    value:   proc { |args| "#{args[0]}" }
  }

  def perform(*args)
    if lock.acquire!
      begin
        product = Product.find_by(id: args[0])
        return unless product

        store = URI(product.url).host.split('.')[1].classify
        "Scraper::#{store}".safe_constantize.new(product.id).scrape_and_save!
      ensure
        lock.release!
      end
    else
      puts "skipping duplicate scrapper for product #{args[0]}"
    end
  end
end
