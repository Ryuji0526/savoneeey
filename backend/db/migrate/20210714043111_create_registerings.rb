class CreateRegisterings < ActiveRecord::Migration[6.1]
  def change
    create_table :registerings do |t|
      t.references :wish_list, null: false
      t.references :account, null: false

      t.timestamps
    end
    add_index :registerings, [:wish_list_id, :account_id], unique: true
  end
end
