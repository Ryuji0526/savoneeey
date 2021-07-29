class Api::V1::WishListsController < ApplicationController
  before_action :set_wish_list, only: [:update, :destroy]

  def index
    wish_lists = current_api_v1_user.wish_lists.all.includes(:wish_tags)
    render json: { status: :success, data: wish_lists.as_json(include: :wish_tags) }
  end

  def create
    wish_list = current_api_v1_user.wish_lists.new(wish_list_params)
    if wish_list.save
      render json: { status: :created, data: wish_list.as_json(include: :wish_tags) }
    else
      render json: { status: :error, data: wish_list.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @wish_list.wish_tag_links.destroy_all
      if @wish_list.update(wish_list_params)
        render json: { status: :updated, data: @wish_list }
      else
        render json: { status: :error, data: @wish_list.errors }, status: :unprocessable_entity
      end
    else
      render json: { status: :error, data: @wish_list.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    if @wish_list.destroy
      render json: { status: :deleted }
    else
      render json: { status: :error, data: @wish_list.errors }, states: :unprocessable_entity
    end
  end

  private

  def set_wish_list
    @wish_list = current_api_v1_user.wish_lists.find(params[:id])
  end

  def wish_list_params
    params.require(:wish_list).permit(:name, :price, :url, wish_tag_links_attributes: [:wish_tag_id])
  end
end
