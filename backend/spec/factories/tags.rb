FactoryBot.define do
  factory :wish_tag do
    name { "wishTag" }
    type { "WishTag" }
  end

  factory :account_tag do
    name { "accountTag" }
    type { "AccountTag" }
  end
end
