FactoryBot.define do
  factory :wish_tag_link do
    association :wish_list
    association :wish_tag
  end
end
