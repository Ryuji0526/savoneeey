class AccountTag < Tag
  has_many :account_tag_links, dependent: :destroy
  has_many :accounts, through: :account_tag_links
end
