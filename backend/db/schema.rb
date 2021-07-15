# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_07_14_043111) do

  create_table "account_histories", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "account_id", null: false
    t.string "action", null: false
    t.integer "amount", null: false
    t.datetime "created_at", null: false
    t.integer "balance", null: false
    t.index ["account_id", "created_at"], name: "index_account_histories_on_account_id_and_created_at"
    t.index ["account_id"], name: "index_account_histories_on_account_id"
  end

  create_table "accounts", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name", default: "", null: false
    t.integer "target_amount", default: 0, null: false
    t.boolean "is_main", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_accounts_on_user_id"
  end

  create_table "registerings", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "wish_list_id", null: false
    t.bigint "account_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["account_id"], name: "index_registerings_on_account_id"
    t.index ["wish_list_id", "account_id"], name: "index_registerings_on_wish_list_id_and_account_id", unique: true
    t.index ["wish_list_id"], name: "index_registerings_on_wish_list_id"
  end

  create_table "tags", charset: "utf8mb4", force: :cascade do |t|
    t.string "name", null: false
    t.string "type", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["type"], name: "index_tags_on_type"
  end

  create_table "trading_histories", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "deposit_id"
    t.bigint "withdrawal_id"
    t.integer "transaction_amount", null: false
    t.datetime "created_at", null: false
    t.index ["created_at"], name: "index_trading_histories_on_created_at"
    t.index ["deposit_id"], name: "index_trading_histories_on_deposit_id"
    t.index ["user_id"], name: "index_trading_histories_on_user_id"
    t.index ["withdrawal_id"], name: "index_trading_histories_on_withdrawal_id"
  end

  create_table "users", charset: "utf8mb4", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.text "tokens"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  create_table "wish_lists", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name", null: false
    t.integer "price", null: false
    t.string "url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_wish_lists_on_user_id"
  end

  create_table "wish_tag_links", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "wish_list_id", null: false
    t.bigint "wish_tag_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["wish_list_id", "wish_tag_id"], name: "index_wish_tag_links_on_wish_list_id_and_wish_tag_id", unique: true
    t.index ["wish_list_id"], name: "index_wish_tag_links_on_wish_list_id"
    t.index ["wish_tag_id"], name: "index_wish_tag_links_on_wish_tag_id"
  end

  add_foreign_key "account_histories", "accounts"
  add_foreign_key "accounts", "users"
  add_foreign_key "trading_histories", "accounts", column: "deposit_id"
  add_foreign_key "trading_histories", "accounts", column: "withdrawal_id"
  add_foreign_key "trading_histories", "users"
  add_foreign_key "wish_lists", "users"
end
