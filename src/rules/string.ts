import { Rule } from '../types'
import { createError, isString, isUndef } from '../utils'

export type StringType = 'string'

export const string = (msg?: string): Rule<StringType, string> => ({
  type: 'string',
  func(ctx) {
    const shouldCheck = !isUndef(ctx.current) || ctx.required

    if (shouldCheck && !isString(ctx.current)) {
      ctx.errors.push(createError('string', msg, ctx))
    }

    return ctx
  }
})
