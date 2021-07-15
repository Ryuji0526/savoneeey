class AccountTagLink < ApplicationRecord
  belongs_to :account
  belongs_to :account_tag
end
