class AddNewNameColumn < ActiveRecord::Migration[6.0]
  def change
    add_column :recipes, :name, :string
  end
end
