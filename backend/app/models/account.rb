class Account < ApplicationRecord
  belongs_to :user
  has_many :trading_histories
  has_many :account_histories, dependent: :destroy

  validates :name, presence: true, length: { maximum: 50 }
  validates :target_amount, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  def recent_histories
    self.account_histories.order(created_at: :DESC).limit(5)
  end

  class << self
    def first_account(user_id)
      Account.create(user_id: user_id, name: "メイン", is_main: true)
    end
  end
end
