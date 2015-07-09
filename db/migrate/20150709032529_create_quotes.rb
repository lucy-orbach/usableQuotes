class CreateQuotes < ActiveRecord::Migration
  def change
    create_table :quotes do |t|
      t.string :movie
      t.string :character
      t.string :txt
      t.string :img

      t.timestamps null: false
    end
  end
end
