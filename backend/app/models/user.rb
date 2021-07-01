class User < ActiveRecord::Base
  has_many :accounts, dependent: :destroy
  has_many :trading_histories, dependent: :destroy
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable
  include DeviseTokenAuth::Concerns::User

  validates :name, presence: true
end
