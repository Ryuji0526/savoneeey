user = User.order(:id).find_by(email: 'guest-user@guest.com')

wish_lists = %w(
  model3:::3400000:::https://www.tesla.com/ja_jp/model3
  MacBookPro:::148280:::https://www.apple.com/jp/shop/buy-mac/macbook-pro/13%E3%82%A4%E3%83%B3%E3%83%81
  アメリカ旅行:::200000:::
  北海道旅行:::80000:::
  GalaxyS21:::99792:::
  iPad:::120000:::
  財布:::12000:::https://www.amazon.co.jp/%E3%82%B3%E3%83%BC%E3%83%81-COACH-F74769-%E3%83%AC%E3%83%87%E3%82%A3%E3%83%BC%E3%82%B9-%E3%82%A2%E3%82%A6%E3%83%88%E3%83%AC%E3%83%83%E3%83%88%E5%93%81/dp/B00SR4JZDE/ref=sr_1_16?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=%E8%B2%A1%E5%B8%83&qid=1627015231&sr=8-16
)

wish_lists.each do |n|
  list = n.split(":::")
  url = list[2].blank? ? '' : list[2]
  user.wish_lists.create!(
    name: list[0],
    price: list[1].to_i,
    url: url
  )
end