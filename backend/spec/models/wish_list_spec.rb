require 'rails_helper'

RSpec.describe WishList, type: :model do
  let(:wish_list) { create(:wish_list) }

  describe "バリデーション" do
    example "正しいリスト名、金額、URLであれば有効" do
      expect(wish_list).to be_valid
    end

    context "user_id" do
      example "がnilならば無効" do
        wish_list.user_id = nil
        expect(wish_list).to be_invalid
      end
    end

    context "name" do
      example "がnilならば無効" do
        wish_list.name = nil
        expect(wish_list).to be_invalid
      end
      example "が31文字以上なら無効" do
        wish_list.name = "a" * 31
        expect(wish_list).to be_invalid
      end
      example "が30文字なら有効" do
        wish_list.name = "a" * 30
        expect(wish_list).to be_valid
      end
    end

    context "price" do
      example "がnilならば無効" do
        wish_list.price = nil
        expect(wish_list).to be_invalid
      end
      example "が小数ならば無効" do
        wish_list.price = 1000.1
        expect(wish_list).to be_invalid
      end
      example "が負の数ならば無効" do
        wish_list.price = -1000
        expect(wish_list).to be_invalid
      end
      example "が0ならば無効" do
        wish_list.price = 0
        expect(wish_list).to be_invalid
      end
    end

    context "url" do
      example "がnilでも有効" do
        wish_list.url = nil
        expect(wish_list).to be_valid
      end
      example "fomratに当てはまらなければ無効" do
        wish_list.url = "htt://test.jp"
        expect(wish_list).to be_invalid
      end
    end
  end
end
