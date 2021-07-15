class CreateWishLists < ActiveRecord::Migration[6.1]
  def change
    create_table :wish_lists do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false
      t.integer :price, null: false
      t.string :url

      t.timestamps
    end
  end
end
