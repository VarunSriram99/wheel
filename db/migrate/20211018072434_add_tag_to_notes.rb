# frozen_string_literal: true

class AddTagToNotes < ActiveRecord::Migration[6.1]
  def change
    add_column :notes, :tag, :string
  end
end
