class CreateTradingHistories < ActiveRecord::Migration[6.1]
  def change
    create_table :trading_histories do |t|
      t.references :user, null: false, foreign_key: true
      t.references :deposit, foreign_key: { to_table: :accounts }
      t.references :withdrawal, foreign_key: { to_table: :accounts }
      t.integer :transaction_amount, null: false
      t.datetime :created_at, null: false
    end
    add_index :trading_histories, :created_at
  end
end
