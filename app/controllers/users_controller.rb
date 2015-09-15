class UsersController < ApplicationController
  def new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login_user(@user)
      redirect_to root
    else
      render :new
    end
  end

  def show
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :name, :is_hoomin)
  end
end
