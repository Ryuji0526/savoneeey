class AccountHistory < ApplicationRecord
  belongs_to :account

  validates :action, presence: true, inclusion: { in: ["出金", "入金", "新規"] }
  validates :amount, presence: true
  validates :amount, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, if: :deposit?
  validates :amount, numericality: { only_integer: true, less_than_or_equal_to: 0 }, unless: :deposit?
  validates :balance, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  def deposit?
    action == "入金"
  end

  class << self
    def first_account_history(account)
      AccountHistory.create(action: "新規", amount: 0, balance: 0, account_id: account.id)
    end

    def add_history(trading_history, current_balance)
      if(!trading_history.deposit_id.nil?)
        AccountHistory.create(
          action: "入金",
          amount: trading_history.transaction_amount,
          balance: current_balance + trading_history.transaction_amount,
          account_id: trading_history.deposit_id)
      end
      if(!trading_history.withdrawal_id.nil?)
        AccountHistory.create(
          action: "出金",
          amount: trading_history.transaction_amount * -1,
          balance: current_balance - trading_history.transaction_amount,
          account_id: trading_history.withdrawal_id)
      end
    end
  end
end
