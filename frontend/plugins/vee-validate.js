import { extend } from 'vee-validate'
import { required, email, confirmed, min } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: '必須項目です',
})

extend('email', {
  ...email,
  message: '正しいメールアドレスを入力してください',
})

extend('confirmed', {
  ...confirmed,
  message: 'パスワードと値が異なります。',
})

extend('min', {
  ...min,
  message: 'パスワードは{length}以上にしてください',
})
