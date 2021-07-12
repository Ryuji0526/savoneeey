class WishList < ApplicationRecord
  belongs_to :user
  has_many :wish_tag_links, dependent: :destroy
  has_many :wish_tags, through: :wish_tag_links
  accepts_nested_attributes_for :wish_tag_links, reject_if: ->(attributes) { attributes['wish_tag_id'].blank? }, allow_destroy: true

  validates :name, presence: true, length: { maximum: 30 }
  validates :price, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :url, format: { with: /\A#{URI.regexp(%w(http https))}\z/, allow_blank: true }
end
