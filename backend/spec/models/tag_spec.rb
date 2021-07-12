require 'rails_helper'

RSpec.describe Tag, type: :model do
  let(:wish_tag) { create(:wish_tag) }

  describe "wish_tag" do
    describe "バリデーション" do
      example "正しいタグ名、typeであれば有効" do
        expect(wish_tag).to be_valid
      end

      context "name" do
        example "がnilならば無効" do
          wish_tag.name = nil
          expect(wish_tag).to be_invalid
        end
        example "が11文字以上ならば無効" do
          wish_tag.name = "a" * 11
          expect(wish_tag).to be_invalid
        end
        example "が10文字ならば有効" do
          wish_tag.name = "a" * 10
          expect(wish_tag).to be_valid
        end
      end
    end
  end
end
