require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { create(:user) }

  example "正しい名前、メール、パスワードがあれば有効" do
    expect(user).to be_valid
  end
  context "name" do
    example "名前がなければ無効" do
      user.name = nil
      expect(user).to be_invalid
    end
  end

  context "email" do
    example "メールアドレスがなければ無効" do
      user.email = nil
      expect(user).to be_invalid
    end
    example "重複したメールアドレスなら無効" do
      other_user = build(:user, email: user.email)
      expect(other_user).to be_invalid
    end
  end

  context "password" do
    example "6文字未満なら無効" do
      user.password = "a" * 5
      user.password_confirmation = "a" * 5
      expect(user).to be_invalid
    end
    example "6文字なら有効" do
      user.password = "a" * 6
      user.password_confirmation = "a" * 6
      expect(user).to be_valid
    end
    example "password_confirmationが異なる文字なら無効" do
      user.password_confirmation = "savoneeey"
      expect(user).to be_invalid
    end
  end
end
