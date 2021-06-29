module RequestSpecHelper
  def login_as(user)
    post api_v1_user_session_path, params: user, as: :json
  end
end
