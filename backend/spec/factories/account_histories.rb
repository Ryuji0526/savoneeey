FactoryBot.define do
  factory :account_history do
    association :account
    action { "新規" }
    amount { 0 }
    balance { 0 }

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

    trait :create_yesterday do
      created_at { 2.day.ago }
    end

    trait :create_lastweek do
      created_at { 2.week.ago }
    end

    trait :create_lastmonth do
      created_at { 2.month.ago }
    end
  end
end
