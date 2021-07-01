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
  message: 'パスワードと値が異なります。',
})

extend('min', {
  ...min,
  message: '{_field_}は{length}文字以上にしてください',
})

extend('minValue', {
  ...min_value,
  message: '{_field_}は0円以上にしてください。',
})

extend('max', {
  ...max,
  message: '{_field_}は{length}文字以下にしてください',
})

extend('integer', {
  ...integer,
  message: '{_field_}は0以上の整数にしてください',
})
/* eslint-enable camelcase */
