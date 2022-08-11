# frozen_string_literal: true

json = ActiveSupport::JSON.decode(File.read('db/seeds/products.json'))
json.each do |record|
  Product.create!(record)
end
