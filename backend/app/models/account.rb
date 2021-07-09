class Account < ApplicationRecord
  belongs_to :user
  has_many :trading_histories
  has_many :account_histories, dependent: :destroy

  validates :name, presence: true, length: { maximum: 50 }
  validates :target_amount, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  def recent_histories
    account_histories.order(created_at: :DESC).select("action, amount, balance, created_at").limit(10)
  end

  def dayly_histories
    account_histories.where(id: account_histories.group("CONCAT(YEAR(created_at), DAY(created_at))").select("MAX(id)")).select("created_at, balance").limit(10)
  end

  def weekly_histories
    account_histories.where(id: account_histories.group("CONCAT(YEAR(created_at), WEEK(created_at))").select("MAX(id)")).select("created_at, balance").limit(10)
  end

  def monthly_histories
    account_histories.where(id: account_histories.group("CONCAT(YEAR(created_at), MONTH(created_at))").select("MAX(id)")).select("created_at, balance").limit(10)
  end

  class << self
    def first_account(user_id)
      Account.create(user_id: user_id, name: "メイン", is_main: true)
    end
  end
end
