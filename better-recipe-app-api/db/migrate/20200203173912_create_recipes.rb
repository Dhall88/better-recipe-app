class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.json :recipe

      t.timestamps
    end
  end
end