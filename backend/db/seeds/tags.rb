wish_tags = %w( 本・コミック・雑誌 ミュージック・ゲーム 家電・カメラ パソコン・オフィス 食品・飲料 おもちゃ・ベビー 服・アクセサリー シューズ・バッグ スポーツ&アウトドア 車&バイク 趣味 遊び 旅行 保険 投資 その他 )

wish_tags.each do |tag|
  WishTag.create!(
    name: tag
  )
end

account_tags = %w( 貯金 食事 製品 趣味 遊び 車&バイク 将来 旅行 保険 投資 その他 )

account_tags.each do |tag|
  AccountTag.create!(
    name: tag
  )
end