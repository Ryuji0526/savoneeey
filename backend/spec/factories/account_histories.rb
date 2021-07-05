FactoryBot.define do
  factory :account_history do
    association :account
    action { "新規" }
    amount { 0 }
    balance { 2000 }

    trait :withdrawal_action do
      action { "出金" }
      amount { -1000 }
      balance { 1000 }
    end

    trait :deposit_action do
      action { "入金" }
      amount { 1000 }
      balance { 3000 }
    end
  end
end
