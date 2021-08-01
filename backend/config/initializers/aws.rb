creds = Aws::Credentials.new( ENV['ACCESS_KEY_ID'], ENV['SECRET_ACCESS_KEY'] )

Aws::Rails.add_action_mailer_delivery_method(:ses, credentials: creds, region: 'ap-northeast-1')
