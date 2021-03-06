# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150924154651) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "jobs", force: :cascade do |t|
    t.string   "title",       null: false
    t.text     "description", null: false
    t.date     "expire_date"
    t.integer  "salary"
    t.string   "url"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "poster_id",   null: false
  end

  add_index "jobs", ["poster_id"], name: "index_jobs_on_poster_id", using: :btree

  create_table "jobsaves", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "job_id",     null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "jobsaves", ["job_id"], name: "index_jobsaves_on_job_id", using: :btree
  add_index "jobsaves", ["user_id", "job_id"], name: "index_jobsaves_on_user_id_and_job_id", unique: true, using: :btree
  add_index "jobsaves", ["user_id"], name: "index_jobsaves_on_user_id", using: :btree

  create_table "jobtaggings", force: :cascade do |t|
    t.integer  "job_id",     null: false
    t.integer  "tag_id",     null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "jobtaggings", ["job_id", "tag_id"], name: "index_jobtaggings_on_job_id_and_tag_id", unique: true, using: :btree

  create_table "resumes", force: :cascade do |t|
    t.text     "text",                                    null: false
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.integer  "user_id",                                 null: false
    t.boolean  "private",                 default: false, null: false
    t.string   "resume_pdf_file_name"
    t.string   "resume_pdf_content_type"
    t.integer  "resume_pdf_file_size"
    t.datetime "resume_pdf_updated_at"
  end

  add_index "resumes", ["user_id"], name: "index_resumes_on_user_id", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string   "label",      null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "tags", ["label"], name: "index_tags_on_label", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "name",            null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "provider"
    t.string   "uid"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["provider", "uid"], name: "index_users_on_provider_and_uid", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
