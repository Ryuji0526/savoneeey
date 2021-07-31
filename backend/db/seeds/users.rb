User.create!(
  name: "ゲストユーザー",
  email: "guest-user@guest.com",
  password: "password",
  confirmed_at: Time.now,
)