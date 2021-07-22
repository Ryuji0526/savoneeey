require 'rails_helper'

RSpec.describe TradingHistory, type: :model do
  let(:trading_history) { create(:trading_history) }

  example "正しいユーザー、取引額、があれば有効" do
    expect(trading_history).to be_valid
  end
  context "user_id" do
    example "nilなら無効" do
      trading_history.user_id = nil
      expect(trading_history).to be_invalid
    end
  end

  context "deposit_id/withdrawal_id" do
    example "どちらもnilなら無効" do
      trading_history.deposit_id = nil
      trading_history.withdrawal_id = nil
      expect(trading_history).to be_invalid
    end
  end

  context "transaction_amount" do
    example "マイナスなら無効" do
      trading_history.transaction_amount = -1000
      expect(trading_history).to be_invalid
    end
    example "整数でなければ無効" do
      trading_history.transaction_amount = 100.1
      expect(trading_history).to be_invalid
    end
    example "0ならば有効" do
      trading_history.transaction_amount = 0
      expect(trading_history).to be_valid
    end
    example "1000万円以降なら無効" do
      trading_history.transaction_amount = 10000001
      expect(trading_history).to be_invalid
    end
    example "1000万円なら有効" do
      trading_history.transaction_amount = 10000000
      expect(trading_history).to be_valid
    end
  end
end
