class CreateTags < ActiveRecord::Migration[6.1]
  def change
    create_table :tags do |t|
      t.string :name, null: false
      t.string :type, null: false

      t.timestamps
    end
    add_index :tags, :type
  end
end
