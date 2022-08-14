module Scraper
  class Flipkart < Base
    attr_reader :scraped_data

    def scrape
      title = crawler.css('.B_NuCI').text
      category = crawler.css('._2whKao').map(&:text)[1]
      description = crawler.css('._1AN87F').text.presence || crawler.xpath('//p[//*[contains(text(), "Description")]]').text
      price = crawler.css('._30jeq3._16Jk6d').text
      size = crawler.css('._3Oikkn._3_ezix._2KarXJ._31hAvz').text
      images = crawler.css('._2FHWw4').css('img').map { |link| link['src'] }
      @scraped_data = { description: description, category: category, title: title,
                        price: price, size: size, images: images }
    end

  end
end
