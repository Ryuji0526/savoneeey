FactoryBot.define do
  factory :account do
    association :user
    sequence(:name) { |n| "Test Account#{n}" }
    target_amount { 10000 }
    is_main { false }

    trait :with_account_histories do
      after(:create) { |account| create(:account_history, account: account) }
    end
  end
end
