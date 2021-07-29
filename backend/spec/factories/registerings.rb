FactoryBot.define do
  factory :registering do
    association :account
    association :wish_list
  end
end
