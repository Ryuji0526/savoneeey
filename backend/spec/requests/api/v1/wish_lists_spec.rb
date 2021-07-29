require 'rails_helper'

RSpec.describe "Api::V1::WishLists", type: :request do
  let(:user) { create(:user) }
  let(:headers) { user.create_new_auth_token }
  let(:wish_list) { create(:wish_list, user: user) }
  let(:wish_list_params) { attributes_for(:wish_list) }
  let(:invalid_wish_list_params) { attributes_for(:wish_list, name: '') }
  let(:tag1) { create(:wish_tag) }
  let(:tag2) { create(:wish_tag) }

  before do
    login_as(user)
  end

  describe "GET /api/v1/wish_lists" do
    before do
      create_list(:wish_list, 10, user: user)
    end

    example "ユーザーのほしい物リスト全てを取得できる" do
      get "/api/v1/wish_lists", headers: headers
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("success")
      expect(res["data"].length).to eq(10)
    end
  end

  describe "Post /api/v1/wish_lists" do
    context "パラメーターが有効な場合" do
      example "ほしい物リストが追加される" do
        expect {
          post "/api/v1/wish_lists", params: wish_list_params, headers: headers, as: :json
        }.to change(WishList, :count).by(1)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("created")
        expect(res["data"]["id"]).to eq(WishList.last.id)
        expect(response.status).to eq 200
      end
      example "タグが選択されていればタグも追加される" do
        expect {
          post "/api/v1/wish_lists", params: { wish_list: {
            name: 'list',
            price: 1000,
            wish_tag_links_attributes: [{ wish_tag_id: tag1.id }, { wish_tag_id: tag2.id }, { wish_tag_id: nil }],
          } },
                                     headers: headers, as: :json
        }.to change(WishTagLink, :count).by(2)
        res = JSON.parse(response.body)
        expect(res["data"]["wish_tags"].first["id"]).to eq(tag1.id)
        expect(res["data"]["wish_tags"].last["id"]).to eq(tag2.id)
        expect(response.status).to eq 200
      end
    end

    context "パラメーターが無効な場合" do
      example "ほしい物リストが追加されない" do
        expect {
          post "/api/v1/wish_lists", params: invalid_wish_list_params, headers: headers, as: :json
        }.not_to change(WishList, :count)
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("error")
        expect(response.status).to eq 422
      end
    end
  end

  describe "Put /api/v1/wish_lists/:id" do
    context "パラメーターが有効な場合" do
      example "ほしい物リストの編集が行われる" do
        put "/api/v1/wish_lists/#{wish_list.id}", params: { wish_list: {
          name: "edit",
          price: 10,
        } }, headers: headers, as: :json
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("updated")
        expect(res['data']['name']).to eq("edit")
        expect(response.status).to eq 200
      end
    end

    context "パラメーターが無効な場合" do
      example "ほしい物リストの編集が行われる" do
        put "/api/v1/wish_lists/#{wish_list.id}", params: { wish_list: {
          name: "",
          price: 10,
        } }, headers: headers, as: :json
        res = JSON.parse(response.body)
        expect(res["status"]).to eq("error")
        expect(response.status).to eq 422
      end
    end
  end

  describe "DELETE /api/v1/accounts/:id" do
    let!(:wish_tag_link) { create(:wish_tag_link, wish_list: wish_list, wish_tag: tag1) }

    example "お気に入りリストを削除できる" do
      expect {
        delete "/api/v1/wish_lists/#{wish_list.id}", headers: headers, as: :json
      }.to change(WishList, :count).by(-1).and change(WishTagLink, :count).by(-1)
      res = JSON.parse(response.body)
      expect(res["status"]).to eq("deleted")
      expect(response.status).to eq(200)
    end
  end
end
