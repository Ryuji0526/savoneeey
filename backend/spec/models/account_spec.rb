require 'rails_helper'

RSpec.describe Account, type: :model do
  let(:user) { create(:user) }
  let(:account) { create(:account) }

  describe "バリデーション" do
    example "正しいユーザー、口座名、目標金額、is_mainがあれば有効" do
      expect(account).to be_valid
    end
    context "user_id" do
      example "がなければ無効" do
        account.user_id = nil
        expect(account.valid?).to be_falsy
      end
    end

    context "name" do
      example "なければ無効" do
        account.name = nil
        expect(account.valid?).to be_falsy
      end
      example "が51文字以上なら無効" do
        account.name = "a" * 51
        expect(account.valid?).to be_falsy
      end
      example "が50文字以上なら有効" do
        account.name = "a" * 50
        expect(account.valid?).to be_truthy
      end
    end

    context "目標金額" do
      example "なければ無効" do
        account.target_amount = nil
        expect(account.valid?).to be_falsy
      end
      example "マイナスなら無効" do
        account.target_amount = -1000
        expect(account.valid?).to be_falsy
      end
      example "整数でなければ無効" do
        account.target_amount = 100.1
        expect(account.valid?).to be_falsy
      end
      example "0なら有効" do
        account.target_amount = 0
        expect(account.valid?).to be_truthy
      end
    end
  end

  describe "クラスメソッド" do
    context "first_account" do
      example "Accountが登録される" do
        expect {
          Account.first_account(user.id)
        }.to change(Account, :count).by(1)
      end
    end
  end
end
