require 'rails_helper'

RSpec.describe Account, type: :model do
  let(:user) { create(:user) }
  let(:account) { create(:account) }
  let!(:account_history) { create_list(:account_history, 11, :deposit_action, account: account) }

  describe "バリデーション" do
    example "正しいユーザー、口座名、目標金額、is_mainがあれば有効" do
      expect(account).to be_valid
    end
    context "user_id" do
      example "がなければ無効" do
        account.user_id = nil
        expect(account).to be_invalid
      end
    end

    context "name" do
      example "なければ無効" do
        account.name = nil
        expect(account).to be_invalid
      end
      example "が51文字以上なら無効" do
        account.name = "a" * 51
        expect(account).to be_invalid
      end
      example "が50文字以上なら有効" do
        account.name = "a" * 50
        expect(account).to be_valid
      end
    end

    context "目標金額" do
      example "なければ無効" do
        account.target_amount = nil
        expect(account).to be_invalid
      end
      example "マイナスなら無効" do
        account.target_amount = -1000
        expect(account).to be_invalid
      end
      example "整数でなければ無効" do
        account.target_amount = 100.1
        expect(account).to be_invalid
      end
      example "0なら有効" do
        account.target_amount = 0
        expect(account).to be_valid
      end
    end
  end

  describe "メソッド" do
    context "recent_histories" do
      let!(:yesterday_history) { create(:account_history, :deposit_action, :create_yesterday, account: account) }

      example "過去10件の履歴が取得できる" do
        expect(account.recent_histories.count).to eq(10)
      end
      example "過去10件より古い履歴は取得できない" do
        expect(account.recent_histories).not_to include(yesterday_history)
      end
    end

    context "dayly_histories" do
      let!(:yesterday_history) { create(:account_history, :deposit_action, :create_yesterday, account: account) }

      example "履歴が追加された日の数取得できる" do
        expect(account.dayly_histories.count).to eq(2)
      end
      example "日ごとの履歴が取得できる" do
        expect(account.dayly_histories[0].created_at).to eq(yesterday_history.created_at)
      end
    end

    context "dayly_histories" do
      let!(:lastweek_history) { create(:account_history, :deposit_action, :create_lastweek, account: account) }

      example "履歴が追加された週の数取得できる" do
        expect(account.weekly_histories.count).to eq(2)
      end
      example "週ごとの履歴が取得できる" do
        expect(account.weekly_histories[0].created_at).to eq(lastweek_history.created_at)
      end
    end

    context "dayly_histories" do
      let!(:lastmonth_history) { create(:account_history, :deposit_action, :create_lastmonth, account: account) }

      example "履歴が追加された月の数取得できる" do
        expect(account.monthly_histories.count).to eq(2)
      end
      example "週ごとの履歴が取得できる" do
        expect(account.monthly_histories[0].created_at).to eq(lastmonth_history.created_at)
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
