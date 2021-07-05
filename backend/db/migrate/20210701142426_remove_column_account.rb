class RemoveColumnAccount < ActiveRecord::Migration[6.1]
  def up
    remove_column :accounts, :balance
  end

  def down
    add_column :accounts, :balance, :integer
  end
end
