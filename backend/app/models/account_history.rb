class AccountHistory < ApplicationRecord
  belongs_to :account

  validates :action, presence :true, inclusion: { in: ["出金", "入金"] }
  validates :amount, presence: :true
  validates :amount, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, if: :deposit?
  validates :amount, numericality: { only_integer: true, less_than_or_equal_to: 0 }, unless: :deposit?

  def deposit?
    action == "入金"
  end
end
