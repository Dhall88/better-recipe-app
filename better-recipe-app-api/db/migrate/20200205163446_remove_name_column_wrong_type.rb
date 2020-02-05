class RemoveNameColumnWrongType < ActiveRecord::Migration[6.0]
  def change
    remove_column :recipes, :general, :json
  end
end
