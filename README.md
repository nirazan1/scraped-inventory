React on Rails App to scrape data from sites like filpkart and show products sorted by category

## Requirements

- [Ruby](https://www.ruby-lang.org/en/downloads/)
- [Node.js](http://nodejs.org/)
- [Redis](https://redis.io/)

## Installation

- Clone repo
- Run `bundle install`
- Run `npm install`
- Run `rake db:create`, `rake db:migrate`, then `rake db:seed`

## Running

- Start the Rails server and esbuild with one command `./bin/dev`
- Start the Redis server with  `redis-server`
- Start the Sidekiq with `sidekiq`

