class CreateAccounts < ActiveRecord::Migration[6.1]
  def change
    create_table :accounts do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false, default: ""
      t.integer :balance, null: false, default: 0
      t.integer :target_amount, null: false, default: 0
      t.boolean :is_main, nill: false, default: false

      t.timestamps
    end
  end
end
