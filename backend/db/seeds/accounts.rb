user = User.order(:id).find_by(email: 'guest@guest.com')

first_account = user.accounts.create!(
  name: 'メイン',
  target_amount: '0',
  is_main: true,
)

AccountHistory.first_account_history(first_account)

accounts = %w(
  Food:0
  Play:300000
  Trip:200000
  Gadgets:400000
  Car:3450000
  Children:5000000
  Feature:800000
)

accounts.each do |n|
  account = n.split(":")
  new_account = user.accounts.create!(
    name: account[0],
    target_amount: account[1].to_i,
    is_main: false,
  )
  AccountHistory.first_account_history(new_account)
end