FactoryBot.define do
  factory :user do
    name { "test" }
    sequence(:email) { |n| "example-#{n}@example.com" }
    password { "password" }
    password_confirmation { "password" }
    confirmed_at { Time.now }

    trait :with_account do
      after(:create) { |user| create_list(:account, 1, user: user) }
    end

    trait :with_confirm_success_url do
      confirm_success_url { '/' }
    end
  end
end
