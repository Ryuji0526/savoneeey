class CreateWishTagLinks < ActiveRecord::Migration[6.1]
  def change
    create_table :wish_tag_links do |t|
      t.references :wish_list, null: false
      t.references :wish_tag, null: false

      t.timestamps
    end
    add_index :wish_tag_links, [:wish_list_id, :wish_tag_id], unique: true
  end
end
