FactoryBot.define do
  factory :wish_tag do
    name { "tag" }
    type { "WishTag" }
  end

  factory :account_tag do
    name { "tag" }
    type { "AccountTag" }
  end
end
