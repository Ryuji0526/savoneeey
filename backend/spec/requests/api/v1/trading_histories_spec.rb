require 'rails_helper'

RSpec.describe "Api::V1::TradingHistories", type: :request do
  let(:user) { create(:user) }
  let(:headers) { user.create_new_auth_token }
  let!(:account) { create(:account, :with_account_histories, is_main: true) }
  let(:trading_history_params) { attributes_for(:trading_history, deposit_id: account.id) }
  let(:invalid_trading_history_params) { attributes_for(:trading_history, user_id: 0) }

  before do
    create_list(:trading_history, 10, user: user)
    login_as(user)
  end

  describe "GET /api/v1/trading_histories" do
    example "userの全ての取引履歴を取得する" do
      get api_v1_trading_histories_path, headers: headers
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("success")
      expect(res["data"].length).to eq(10)
    end
  end

  describe "Post /api/v1/trading_histories" do
    context "パラメーターが有効な場合" do
      example "取引履歴が追加される" do
        expect {
          post "/api/v1/trading_histories", params: trading_history_params, headers: headers, as: :json
        }.to change(TradingHistory, :count).by(1)
        res = JSON.parse(response.body)
        expect(res["data"]["id"]).to eq(TradingHistory.last.id)
        expect(res["data"]["transaction_amount"]).to eq(TradingHistory.last.transaction_amount)
        expect(response.status).to eq 200
      end

      example "AccountHistoryが追加される" do
        expect {
          post "/api/v1/trading_histories", params: trading_history_params, headers: headers, as: :json
        }.to change(AccountHistory, :count).by(1)
        latest_history = AccountHistory.last
        expect(latest_history.action).to eq("入金")
      end
    end

    context "パラメーターが無効な場合" do
      example "取引履歴が追加されない" do
        expect {
          post "/api/v1/trading_histories", params: invalid_trading_history_params, headers: headers, as: :json
        }.not_to change(TradingHistory, :count)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("error")
        expect(response.status).to eq 422
      end
    end
  end
end
