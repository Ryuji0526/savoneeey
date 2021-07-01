class Api::V1::AccountsController < ApplicationController
  before_action :set_account, only: [:show, :update, :destroy]

  def index
      accounts = current_api_v1_user.accounts.all
      render json: { status: :success, data: accounts }
  end

  def show
    render json: { status: :success, data: @account }
  end

  def create
    account = current_api_v1_user.accounts.new(account_params)
    if account.save
      render json: account, status: :created
    else
      render json: { status: :error, data: account.errors }
    end
  end

  def update
    if @account.update(account_params)
      render json: @account, status: :updated
    else
      render json: { status: :error, data: account.errors }
    end
  end

  def destroy
    if @account.destroy
      render json: { status: :success, data: @account }
    else
      render json: { status: :error, data: @account.errors }
    end
  end

  private

  def set_account
    @account = current_api_v1_user.accounts.find(params[:id])
  end

  def account_params
    params.require(:account).permit(:user_id ,:name, :target_amount)
  end
end
