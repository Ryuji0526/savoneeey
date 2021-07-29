require 'rails_helper'

RSpec.describe "Api::V1::Registerings", type: :request do
  let(:user) { create(:user) }
  let(:headers) { user.create_new_auth_token }
  let(:account) { create(:account, user: user) }
  let(:unregistered_account) { attributes_for(:account, user: user) }
  let(:wish_list1) { create(:wish_list, user: user) }
  let(:wish_list2) { create(:wish_list, user: user) }

  before do
    login_as(user)
  end

  describe "POST /api/v1/registerings/register" do
    context "パラメーターが有効な場合" do
      example "口座にほしい物リストを登録できる" do
        expect {
          post "/api/v1/registerings/register", params: { account_id: account.id, wish_list_ids: [wish_list1.id, wish_list2.id] }, headers: headers, as: :json
        }.to change(Registering, :count).by(2)
      end
    end
  end

  describe "POST /api/v1/registerings/unregister" do
    before do
      Registering.create(account_id: account.id, wish_list_id: wish_list1.id)
    end

    example "口座に登録してあるほしい物リストを解除できる" do
      expect {
        delete "/api/v1/registerings/unregister", params: { account_id: account.id, wish_list_id: wish_list1.id }, headers: headers, as: :json
      }.to change(Registering, :count).by(-1)
    end
  end
end
