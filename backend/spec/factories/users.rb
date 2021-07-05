FactoryBot.define do
  factory :user do
    name { "test" }
    sequence(:email) { |n| "example-#{n}@example.com" }
    password { "password" }
    password_confirmation { "password" }

    trait :with_account do
      after(:create) { |user| create_list(:account, 1, user: user) }
    end
  end
end
