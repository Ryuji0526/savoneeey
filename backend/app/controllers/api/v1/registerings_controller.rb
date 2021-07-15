class Api::V1::RegisteringsController < ApplicationController
  before_action :set_account, only: [:register, :unregister]

  def register
    wish_lists = WishList.find(params[:wish_list_ids])
    registerings = wish_lists.map do |list|
      @account.registerings.new(wish_list_id: list.id)
    end
    if save(registerings)
      render json: { status: :created, data: registerings }
    else
      render json: { status: :error }, status: :unprocessable_entity
    end
  end

  def unregister
    registering = @account.registerings.find_by(wish_list_id: params[:wish_list_id])
    if registering.destroy
      render json: { status: :deleted }
    else
      render json: { status: :error, data: registering.errors }, status: :unprocessable_entity
    end
  end

  private

  def set_account
    @account = current_api_v1_user.accounts.find(params[:account_id])
  end

  def save(registerings)
    Registering.transaction do
      registerings.each do |registering|
        registering.save!
      end
    end
  end
end
