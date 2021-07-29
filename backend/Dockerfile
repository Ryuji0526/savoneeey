FROM ruby:2.6.6

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

RUN mkdir /app
WORKDIR /app

ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock

RUN apt-get update -qq && \
  apt-get install -y build-essential graphviz \
  libpq-dev \
  sudo \
  nginx

RUN gem install bundler
RUN bundle install

ADD . /app
RUN mkdir -p tmp/sockets
RUN mkdir tmp/pids

RUN groupadd nginx
RUN useradd -g nginx nginx
ADD nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

RUN chmod +x /app/entrypoint.sh

CMD ["/app/entrypoint.sh"]
