class Api::V1::AccountsController < ApplicationController
  before_action :set_account, only: [:update, :destroy]

  def index
    accounts = current_api_v1_user.accounts.all.includes(:account_histories)
    render json: { status: :success, data: accounts.as_json(methods: :recent_histories,) }
  end

  def show
    account = current_api_v1_user.accounts.includes(:account_histories, :wish_lists, :account_tags).find(params[:id])
    render json: { status: :success, data: account.as_json(methods: [:recent_histories, :weekly_histories, :dayly_histories, :monthly_histories], include: [{ account_tags: { only: [:name, :id] } }, { wish_lists: { include: { wish_tags: { only: :name } } } }]) }
  end

  def create
    account = current_api_v1_user.accounts.new(account_params)
    Account.transaction do
      AccountHistory.transaction do
        account.save!
        AccountHistory.first_account_history(account)
      end
    end
    render json: { data: account, status: :created }
  rescue => e
    render json: { status: :error, data: e.message }, status: :unprocessable_entity
  end

  def update
    if @account.account_tag_links.destroy_all
      if @account.update(account_params)
        render json: { data: @account, status: :updated }
      else
        render json: { status: :error, data: @account.errors }, status: :unprocessable_entity
      end
    else
      render json: { status: :error, data: @account.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    if !(@account.account_histories.last.balance == 0) || @account.is_main?
      render json: { status: :error, data: '口座に残高が存在しています。' }, status: :unprocessable_entity
    else
      if @account.destroy
        render json: { status: :deleted }
      else
        render json: { status: :error, data: @account.errors }, status: :unprocessable_entity
      end
    end
  end

  private

  def set_account
    @account = current_api_v1_user.accounts.find(params[:id])
  end

  def account_params
    params.require(:account).permit(:name, :target_amount, account_tag_links_attributes: [:account_tag_id])
  end
end
