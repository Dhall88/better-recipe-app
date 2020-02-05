class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.json :general
      t.json :instructions
      t.json :ingredients

      t.timestamps
    end
  end
end
