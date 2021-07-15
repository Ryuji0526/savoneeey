class CreateAccountTagLinks < ActiveRecord::Migration[6.1]
  def change
    create_table :account_tag_links do |t|
      t.references :account, null: false
      t.references :account_tag

      t.timestamps
    end
    add_index :account_tag_links, [:account_id, :account_tag_id], unique: true
  end
end
