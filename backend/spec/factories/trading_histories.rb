FactoryBot.define do
  factory :trading_history do
    association :deposit, factory: :account
    association :user
    transaction_amount { 1000 }
  end
end
