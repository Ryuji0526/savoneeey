/* eslint-disable camelcase */
import { extend } from 'vee-validate'
import {
  required,
  email,
  confirmed,
  min,
  min_value,
  max,
  integer,
} from 'vee-validate/dist/rules'

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
  message: 'パスワードと値が異なります',
})

extend('min', {
  ...min,
  message: '{_field_}は{length}文字以上にしてください',
})

extend('minValue', {
  ...min_value,
  message: '{_field_}は0円以上にしてください',
})

extend('max', {
  ...max,
  message: '{_field_}は{length}文字以下にしてください',
})

extend('integer', {
  ...integer,
  message: '{_field_}は0以上の整数にしてください',
})

extend('lessThanBalance', {
  params: ['balance', 'action'],
  message: '残高以上の金額を出金できません',
  validate(value, { balance, action }) {
    if (action === '入金' || value <= +balance) {
      return true
    }
  },
})

extend('url', {
  message: '正しいURLを入力してください',
  validate(value) {
    const reg =
      /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    if (reg.test(value)) {
      return true
    }
  },
})
/* eslint-enable camelcase */
