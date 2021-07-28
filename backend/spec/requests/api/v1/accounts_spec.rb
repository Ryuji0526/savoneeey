require 'rails_helper'

RSpec.describe "Api::V1::Accounts", type: :request do
  let(:user) { create(:user) }
  let(:headers) { user.create_new_auth_token }
  let(:account) { create(:account, user: user) }
  let(:account_params) { attributes_for(:account) }
  let(:invalid_account_params) { attributes_for(:account, name: "") }
  let(:tag1) { create(:account_tag) }
  let(:tag2) { create(:account_tag) }

  before do
    create_list(:account, 10, user: user)
  end

  describe "GET /api/v1/accounts" do
    example "userの全ての口座を取得する" do
      get '/api/v1/accounts', headers: headers
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("success")
      expect(res["data"].length).to eq(10)
    end
  end

  describe "POST /api/v1/accounts" do
    context "パラメーターが有効な場合" do
      example "口座が開設される" do
        expect {
          post "/api/v1/accounts", params: account_params, headers: headers, as: :json
        }.to change(Account, :count).by(1)
        res = JSON.parse(response.body)
        expect(res["data"]["id"]).to eq(Account.last.id)
        expect(res["data"]["name"]).to eq(Account.last.name)
        expect(response.status).to eq 200
      end
      example "AccountHistoryが追加される" do
        expect {
          post "/api/v1/accounts", params: account_params, headers: headers, as: :json
        }.to change(AccountHistory, :count).by(1)
        latest_history = AccountHistory.last
        expect(latest_history.action).to eq("新規")
      end
      example "タグが選択されていればタグも追加される" do
        expect {
          post "/api/v1/accounts", params: { account: {
            name: 'test',
            target_amount: 1000,
            is_main: false,
            account_tag_links_attributes: [{ account_tag_id: tag1.id }, { account_tag_id: tag2.id }],
          } }, headers: headers, as: :json
        }.to change(AccountTagLink, :count).by(2)
      end
    end

    context "パラメーターが無効な場合" do
      example "口座が開設されない" do
        expect {
          post "/api/v1/accounts", params: invalid_account_params, headers: headers, as: :json
        }.not_to change(Account, :count)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("error")
        expect(response.status).to eq 422
      end
    end
  end

  describe "PUT /api/v1/accounts/:id" do
    context "パラメーターが有効な場合" do
      example "口座の編集が行われる" do
        put "/api/v1/accounts/#{account.id}", params: { account: { name: "edited account" } }, headers: headers, as: :json
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("updated")
        expect(res['data']['name']).to eq("edited account")
        expect(response.status).to eq(200)
      end

      example "タグが選択されていればタグも追加される" do
        expect {
          put "/api/v1/accounts/#{account.id}", params: { account: {
            name: "edited account",
            account_tag_links_attributes: [{ account_tag_id: tag1.id }, { account_tag_id: tag2.id }],
          } }, headers: headers, as: :json
        }.to change(account.account_tags, :count).by(2)
      end
    end

    context "パラメーターが無効な場合" do
      example "口座の編集ができない" do
        put "/api/v1/accounts/#{account.id}", params: { account: { name: "" } }, headers: headers, as: :json
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("error")
        expect(response.status).to eq 422
      end
    end
  end

  describe "DELETE /api/v1/accounts/:id" do
    context "残高が0円の場合" do
      let!(:account_history) { create(:account_history, :withdrawal_action, balance: 0, account: account) }

      example "is_main = false なら口座を削除できる" do
        expect {
          delete "/api/v1/accounts/#{account.id}", headers: headers, as: :json
        }.to change(Account, :count).by(-1)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("deleted")
        expect(response.status).to eq(200)
      end

      example "is_main = true なら口座を削除できない" do
        account.update_column(:is_main, true)
        expect {
          delete "/api/v1/accounts/#{account.id}", headers: headers, as: :json
        }.not_to change(Account, :count)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("error")
        expect(response.status).to eq 422
      end

      example "accountTagLinkも削除される" do
        account.account_tag_links.create(account_tag_id: tag1.id)
        expect {
          delete "/api/v1/accounts/#{account.id}", headers: headers, as: :json
        }.to change(AccountTagLink, :count).by(-1)
      end
    end

    context "残高が0円でない場合" do
      let!(:account_history) { create(:account_history, :deposit_action, account: account) }

      example "口座を削除できない" do
        expect {
          delete "/api/v1/accounts/#{account.id}", headers: headers, as: :json
        }.not_to change(Account, :count)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("error")
        expect(response.status).to eq 422
      end
    end
  end
end
