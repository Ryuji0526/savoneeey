require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do
  let(:user) { create(:user) }

  describe "POST /api/v1/auth" do
    let(:user_params) { attributes_for(:user) }
    let(:invalid_user_params) { attributes_for(:user, email: "") }

    context "パラメーターが有効な場合" do
      example "リクエストが成功する" do
        expect {
          post api_v1_user_registration_path, params: user_params
        }.to change(User, :count).by(1)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("success")
        expect(res["data"]["id"]).to eq(User.last.id)
        expect(res["data"]["email"]).to eq(User.last.email)
        expect(response.status).to eq 200
      end

      example "ユーザーが登録される" do
        expect {
          post api_v1_user_registration_path, params: user_params
        }.to change(User, :count).by(1)
      end

      example "Accountが追加される" do
        expect {
          post api_v1_user_registration_path, params: user_params
        }.to change(Account, :count).by(1)
        main_account = Account.first
        expect(main_account.is_main).to be_truthy
      end

      example "AccountHistoryが追加される" do
        expect {
          post api_v1_user_registration_path, params: user_params
        }.to change(AccountHistory, :count).by(1)
        latest_history = AccountHistory.last
        expect(latest_history.action).to eq("新規")
      end
    end

    context "パラメーターが無効な場合" do
      example "リクエストが失敗する" do
        expect {
          post api_v1_user_registration_path, params: invalid_user_params
        }.not_to change(User, :count)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("error")
        expect(res["errors"]["full_messages"]).to include("Email can't be blank")
        expect(response.status).to eq 422
      end
    end
  end

  describe "Post /api/v1/auth/sign_in" do
    context "メールアドレス、パスワードが正しい時" do
      example "ログインできる" do
        post api_v1_user_session_path, params: {
          email: user.email,
          password: user.password
        }, as: :json
        expect(response.headers["uid"]).to be_present
        expect(response.headers["access-token"]).to be_present
        expect(response.headers["client"]).to be_present
        expect(response).to have_http_status(200)
      end
    end

    context "メールアドレスが正しくない時" do
      it "ログインできない" do
        post api_v1_user_session_path, params: {
          email: "invalid@invalid.com",
          password: user.password
        }, as: :json
        res = JSON.parse(response.body)
        expect(res["success"]).to be_falsey
        expect(res["errors"]).to include("Invalid login credentials. Please try again.")
        expect(response.headers["uid"]).to be_blank
        expect(response.headers["access-token"]).to be_blank
        expect(response.headers["client"]).to be_blank
        expect(response).to have_http_status(401)
      end
    end

    context "パスワードが正しくない時" do
      it "ログインできない" do
        post api_v1_user_session_path, params: {
          email: user.email,
          password: "invalid"
        }, as: :json
        res = JSON.parse(response.body)
        expect(res["success"]).to be_falsey
        expect(res["errors"]).to include("Invalid login credentials. Please try again.")
        expect(response.headers["uid"]).to be_blank
        expect(response.headers["access-token"]).to be_blank
        expect(response.headers["client"]).to be_blank
        expect(response).to have_http_status(401)
      end
    end
  end

  describe "DELETE /api/v1/auth/sign_out" do
    context "ログインしている時" do
      let(:headers) { user.create_new_auth_token }

      it "ログアウトできる" do
        login_as(user)
        delete destroy_api_v1_user_session_path, headers: headers
        res = JSON.parse(response.body)
        expect(res["success"]).to be_truthy
        expect(user.reload.tokens).to be_blank
        expect(response).to have_http_status(200)
      end
    end
  end
end
