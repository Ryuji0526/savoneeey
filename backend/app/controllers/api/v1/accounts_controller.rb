class Api::V1::AccountsController < ApplicationController
  before_action :set_account, only: [:update, :destroy]

  def index
    accounts = current_api_v1_user.accounts.all.includes(:account_histories)
    render json: { status: :success, data: accounts.as_json(methods: :recent_histories,) }
  end

  def show
    account = current_api_v1_user.accounts.includes(:account_histories).find(params[:id])
    render json: { status: :success, data: account.as_json(methods: [:recent_histories, :weekly_histories, :dayly_histories, :monthly_histories]) }
  end

  def create
    account = current_api_v1_user.accounts.new(account_params)
    if account.save
      AccountHistory.first_account_history(account)
      render json: { data: account, status: :created }
    else
      render json: { status: :error, data: account.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @account.update(account_params)
      render json: { data: @account, status: :updated }
    else
      render json: { status: :error, data: @account.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    if @account.destroy
      render json: { status: :success, data: @account }
    else
      render json: { status: :error, data: @account.errors }, status: :unprocessable_entity
    end
  end

  private

  def set_account
    @account = current_api_v1_user.accounts.find(params[:id])
  end

  def account_params
    params.require(:account).permit(:name, :target_amount, :id)
  end
end
