class TradingHistory < ApplicationRecord
  belongs_to :user
  belongs_to :deposit, class_name: "Account", foreign_key: "deposit_id", optional: true
  belongs_to :withdrawal, class_name: "Account", foreign_key: "withdrawal_id", optional: true

  validates :transaction_amount, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 10000000 }
  validate :can_not_be_balnk

  def can_not_be_balnk
    if deposit_id.nil? && withdrawal_id.nil?
      errors.add(:deposit_id, "can't be blank if withdrawal_id is blank")
    end
  end
end
