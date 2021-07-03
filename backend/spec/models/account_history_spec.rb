require 'rails_helper'

RSpec.describe AccountHistory, type: :model do
  let(:account) { create(:account) }
  let(:account2) { create(:account, is_main: true) }
  let(:account_history) { create(:account_history) }
  let(:trading_history) { create(:trading_history, withdrawal_id: account2.id) }

  describe "バリデーション" do
    example "正しいアクション、金額、残高があれば有効" do
      expect(account_history).to be_valid
    end
    context "action" do
      example "nilならば無効" do
        account_history.action = nil
        expect(account_history.valid?).to be_falsy
      end
      example "「出金、入金、新規」以外ならば無効" do
        account_history.action = 'テスト'
        expect(account_history.valid?).to be_falsy
      end
    end

    context "amount" do
      example "nilならば無効" do
        account_history.amount = nil
        expect(account_history.valid?).to be_falsy
      end
      context "action=入金のとき" do
        before do
          account_history.action = "入金"
        end

        example "正の数なら有効" do
          account_history.amount = 100
          expect(account_history.valid?).to be_truthy
        end
        example "0なら有効" do
          account_history.amount = 0
          expect(account_history.valid?).to be_truthy
        end
        example "負の数なら無効" do
          account_history.amount = -1000
          expect(account_history.valid?).to be_falsy
        end
        example "小数点が含まれるなら無効" do
          account_history.amount = 100.1
          expect(account_history.valid?).to be_falsy
        end
      end

      context "action=出金のとき" do
        before do
          account_history.action = "出金"
        end

        example "負の数なら有効" do
          account_history.amount = -100
          expect(account_history.valid?).to be_truthy
        end
        example "0なら有効" do
          account_history.amount = 0
          expect(account_history.valid?).to be_truthy
        end
        example "正の数なら無効" do
          account_history.amount = 1000
          expect(account_history.valid?).to be_falsy
        end
        example "小数点が含まれるなら無効" do
          account_history.amount = 100.1
          expect(account_history.valid?).to be_falsy
        end
      end

      context "action=新規のとき" do
        before do
          account_history.action = "新規"
        end

        example "負の数なら無効" do
          account_history.amount = -100
          expect(account_history.valid?).to be_falsy
        end
        example "0なら有効" do
          account_history.amount = 0
          expect(account_history.valid?).to be_truthy
        end
        example "正の数なら無効" do
          account_history.amount = 1000
          expect(account_history.valid?).to be_falsy
        end
      end
    end
  end

  describe "クラスメソッド" do
    context "first_account_history" do
      example "AccountHistoryが追加される" do
        expect {
          AccountHistory.first_account_history(account)
        }.to change(AccountHistory, :count).by(1)
        latest_history = AccountHistory.last
        expect(latest_history.action).to eq("新規")
        expect(latest_history.amount).to eq(0)
        expect(latest_history.balance).to eq(0)
        expect(latest_history.account_id).to eq(account.id)
      end
    end

    context "add_history" do
      context "deposit_id=nilのとき" do
        example "action=出金のAccountHistoryが1つ作成される" do
          trading_history.deposit_id = nil
          expect {
            AccountHistory.add_history(trading_history, 2000)
          }.to change(AccountHistory, :count).by(1)
          history = AccountHistory.last
          expect(history.action).to eq('出金')
          expect(history.amount).to eq(trading_history.transaction_amount * -1)
          expect(history.balance).to eq(2000 - trading_history.transaction_amount)
        end
      end

      context "withdrawal_id=nilのとき" do
        example "action=出金のAccountHistoryが1つ作成される" do
          trading_history.withdrawal_id = nil
          expect {
            AccountHistory.add_history(trading_history, 2000)
          }.to change(AccountHistory, :count).by(1)
          history = AccountHistory.last
          expect(history.action).to eq('入金')
          expect(history.amount).to eq(trading_history.transaction_amount)
          expect(history.balance).to eq(2000 + trading_history.transaction_amount)
        end
      end

      context "deposit_id,withdrawal_idともにnil出ない時" do
        example "AccountHistoryが2つ作成される" do
          expect {
            AccountHistory.add_history(trading_history, 2000)
          }.to change(AccountHistory, :count).by(2)
        end
      end
    end
  end
end
