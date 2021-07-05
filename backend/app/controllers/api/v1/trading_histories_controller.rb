class Api::V1::TradingHistoriesController < ApplicationController
  def index
    trading_histories = current_api_v1_user.trading_histories.all.order(created_at: "ASC")
    render json: { status: :success, data: trading_histories }
  end

  def create
    trading_history = current_api_v1_user.trading_histories.new(trading_params)
    if trading_history.save
      AccountHistory.add_history(trading_history)
      render json: { data: trading_history, status: :created }
    else
      render json: { status: :error, data: trading_history.errors }, status: :unprocessable_entity
    end
  end

  private

  def trading_params
    params.require(:trading_history).permit(:deposit_id, :withdrawal_id, :transaction_amount)
  end
end
