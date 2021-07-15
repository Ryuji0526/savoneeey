class WishTag < Tag
  has_many :wish_tag_links, dependent: :destroy
  has_many :wish_lists, through: :wish_tag_links
end
