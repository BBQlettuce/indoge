class AddIndicesAndUidAndProviderToUsers < ActiveRecord::Migration
  def change
    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true

    add_column :users, :provider, :string
    add_column :users, :uid, :string
    add_index :users, [:provider, :uid], unique: true
  end
end
