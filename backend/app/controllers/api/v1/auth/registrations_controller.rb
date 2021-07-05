class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  def create
    super
    account = Account.first_account(current_api_v1_user.id)
    AccountHistory.first_account_history(account)
  end

  private

  def sign_up_params
    params.permit(:name, :email, :password, :password_confirmation)
  end

  def account_update_params
    params.permit(:name, :email)
  end
end
