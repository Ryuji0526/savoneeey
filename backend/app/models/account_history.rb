class AccountHistory < ApplicationRecord
  belongs_to :account

  validates :action, presence: true, inclusion: { in: ["出金", "入金", "新規"] }
  validates :amount, presence: true
  validates :amount, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 10000000 }, if: -> { action == "入金" }
  validates :amount, numericality: { only_integer: true, less_than_or_equal_to: 0, greater_than_or_equal_to: -10000000 }, if: -> { action == "出金" }
  validates :amount, inclusion: { in: [0] }, if: -> { action == "新規" }
  validates :balance, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  class << self
    def first_account_history(account)
      AccountHistory.create(action: "新規", amount: 0, balance: 0, account_id: account.id)
    end

    def add_history(trading_history)
      if !trading_history.deposit_id.nil?
        current_balance = Account.find(trading_history.deposit_id).account_histories.last.balance
        AccountHistory.create(
          action: "入金",
          amount: trading_history.transaction_amount,
          balance: current_balance + trading_history.transaction_amount,
          account_id: trading_history.deposit_id
        )
      end
      if !trading_history.withdrawal_id.nil?
        current_balance = Account.find(trading_history.withdrawal_id).account_histories.last.balance
        AccountHistory.create(
          action: "出金",
          amount: trading_history.transaction_amount * -1,
          balance: current_balance - trading_history.transaction_amount,
          account_id: trading_history.withdrawal_id
        )
      end
    end
  end
end
