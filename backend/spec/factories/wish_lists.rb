FactoryBot.define do
  factory :wish_list do
    association :user
    sequence(:name) { |n| "Test List#{n}" }
    price { 1000 }
    url { "https://testtest.com" }
  end
end
