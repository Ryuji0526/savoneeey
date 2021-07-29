#!/bin/bash

sudo service nginx start
cd /app
bin/setup
bundle exec rails db:migrate:reset RAILS_ENV=production
bundle exec rails db:seed
bundle exec pumactl start