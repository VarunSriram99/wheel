# frozen_string_literal: true

class Note < ApplicationRecord
  belongs_to :user
  validates :title, :description, presence: true
  validates :title, uniqueness: true
  before_create :build_default_tag

  private

    def build_default_tag
      if self.tag.nil?
        self.tag = "Getting Started"
      end
    end
end
