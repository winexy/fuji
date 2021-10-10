import { Rule } from '../types'
import { isString, isNil } from '../utils'

export type DefaultToType = 'default-to'

export const defaultTo = <
  Value,
  DefaultValue extends Exclude<Value, undefined>
>(
  defaultValue: Exclude<DefaultValue, undefined>
): Rule<DefaultToType, Exclude<DefaultValue, undefined>> => ({
  type: 'default-to',
  canSkipCheck: false,
  func: ctx => ({
    ...ctx,
    current:
      isNil(ctx.current) || (isString(ctx.current) && ctx.current === '')
        ? defaultValue
        : ctx.current
  })
})
