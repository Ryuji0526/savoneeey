module RequestSpecHelper
  def login_as(user)
    post api_v1_user_session_path, params: {
      email: user.email,
      password: user.password
    }, as: :json
  end
end
