import { fmap } from '..'
import { isUndef } from '../utils'

export const defaultTo = <Value>(defaultValue: Value) =>
  fmap(value => (isUndef(value) || value === '' ? defaultValue : value))
