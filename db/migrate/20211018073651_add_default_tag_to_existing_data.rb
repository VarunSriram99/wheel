# frozen_string_literal: true

class AddDefaultTagToExistingData < ActiveRecord::Migration[6.1]
  def up
    notes_with_nil_tag = Note.where(tag: nil)
    notes_with_nil_tag.each do |note|
      note.send(:build_default_tag)
      note.save!
    end
  end
end
