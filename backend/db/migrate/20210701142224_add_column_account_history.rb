class AddColumnAccountHistory < ActiveRecord::Migration[6.1]
  def change
    add_column :account_histories, :balance, :integer, null: false
  end
end
