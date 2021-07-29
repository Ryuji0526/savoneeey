#!/bin/bash

sudo service nginx start
cd /app
bin/setup
bundle exec rails db:migrate:reset
bundle exec rails db:seed
bundle exec pumactl start