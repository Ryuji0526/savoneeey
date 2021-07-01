class Account < ApplicationRecord
  belongs_to :user

  validates :name, presence: true, length: { maximum: 50 }
  validates :balance, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0}
  validates :target_amount, presence: :true, numericality: { only_integer: true, greater_than_or_equal_to: 0}

  class << self
    def create_main_account(user_id)
      Account.create(user_id: user_id, name: "メイン", is_main: true)
    end
  end
end
