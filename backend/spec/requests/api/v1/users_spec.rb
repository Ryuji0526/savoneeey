require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do
  let(:user) { create(:user) }

  describe "POST /api/v1/auth" do
    let(:user_params) { attributes_for(:user) }
    let(:invalid_user_params) { attributes_for(:user, email: "") }

    context "パラメーターが有効な場合" do
      example "リクエストが成功する" do
        post api_v1_user_registration_path, params: user_params
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("success")
        expect(res["data"]["id"]).to eq(User.last.id)
        expect(res["data"]["email"]).to eq(User.last.email)
        expect(response.status).to eq 200
      end
    end

    context "パラメーターが無効な場合" do
      example "リクエストが失敗する" do
        post api_v1_user_registration_path, params: invalid_user_params
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("error")
        expect(res["errors"]["full_messages"]).to include("Email can't be blank")
        expect(response.status).to eq 422
      end
    end
  end

  describe "Post /api/v1/auth/sign_in" do
    context "メールアドレス、パスワードが正しい時" do
      let(:login_params) { { email: user.email, password: user.password } }

      example "ログインできる" do
        login_as(login_params)
        expect(response.headers["uid"]).to be_present
        expect(response.headers["access-token"]).to be_present
        expect(response.headers["client"]).to be_present
        expect(response).to have_http_status(200)
      end
    end

    context "メールアドレスが正しくない時" do
      let(:invalid_login_params) { { email: "invalid@example.com", password: user.password } }

      it "ログインできない" do
        login_as(invalid_login_params)
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
      let(:invalid_login_params) { { email: user.email, password: "invalid-pass" } }

      it "ログインできない" do
        login_as(invalid_login_params)
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
      let(:login_params) { { email: user.email, password: user.password } }
      let(:headers) { user.create_new_auth_token }

      it "ログアウトできる" do
        login_as(login_params)
        delete destroy_api_v1_user_session_path, headers: headers
        res = JSON.parse(response.body)
        expect(res["success"]).to be_truthy
        expect(user.reload.tokens).to be_blank
        expect(response).to have_http_status(200)
      end
    end
  end
end
