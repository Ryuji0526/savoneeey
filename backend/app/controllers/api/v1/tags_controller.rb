class Api::V1::TagsController < ApplicationController
  def wish_tags
    wish_tags = WishTag.all
    render json: { status: :success, data: wish_tags }
  end

  def account_tags
    account_tags = AccountTag.all
    render json: { status: :success, data: account_tags }
  end
end
