import { Rule } from '../types'
import { isString, isUndef } from '../utils'

export type DefaultToType = 'default-to'

export const defaultTo = <
  Value,
  DefaultValue extends Exclude<Value, undefined>
>(
  defaultValue: Exclude<DefaultValue, undefined>
): Rule<DefaultToType, Exclude<DefaultValue, undefined>> => ({
  type: 'default-to',
  func: ctx => ({
    ...ctx,
    current:
      isUndef(ctx.current) || (isString(ctx.current) && ctx.current === '')
        ? defaultValue
        : ctx.current
  })
})
