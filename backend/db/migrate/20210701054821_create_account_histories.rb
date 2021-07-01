class CreateAccountHistories < ActiveRecord::Migration[6.1]
  def change
    create_table :account_histories do |t|
      t.references :account, null: false, foreign_key: true
      t.string :action, null: false
      t.integer :amount, null: false
      t.datetime :created_at, null: false
    end
    add_index :account_histories, [ :account_id, :created_at ]
  end
end
