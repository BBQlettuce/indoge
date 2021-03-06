class Job < ActiveRecord::Base
  include PgSearch
  pg_search_scope :search_jobs_by_all,
    against: [:title, :description],
    associated_against: {poster: :name},
    using: {tsearch: {prefix: true}}

  validates :title, :description, :poster_id, presence: true
  validates :salary, numericality: true, allow_nil: true

  belongs_to :poster,
  class_name: "User",
  foreign_key: :poster_id,
  primary_key: :id

  has_many :job_saves,
  class_name: "Jobsave",
  foreign_key: :job_id,
  primary_key: :id

  has_many :jobtaggings

  has_many :tags,
  through: :jobtaggings,
  source: :tag

  def description_snippet
    if description.length <= 160
      return description
    else
      return description.slice(0, 160) + "..."
    end
  end
end
