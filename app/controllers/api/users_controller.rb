class Api::UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
    render :show
  end

  def create
    @user = User.new(user_params)

    if @user.save
      signin!(@user)
      render json: {}
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  protected

  def user_params
    self.params.require(:user).permit(:email, :password, :name)
  end
end
