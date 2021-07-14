class Api::V1::TagsController < ApplicationController
  def wish_tags
    wish_tags = WishTag.all
    render json: { status: :success, data: wish_tags }
  end
end
