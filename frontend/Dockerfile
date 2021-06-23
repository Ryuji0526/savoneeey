FROM node:14.3

WORKDIR /app

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock

RUN apt-get update -y && \
  apt-get upgrade -y && \
  yarn global add ejs && \
  yarn global add nuxt &&\
  yarn global add create-nuxt-app

ADD . /app

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]