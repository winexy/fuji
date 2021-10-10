import { Rule } from '../types'
import { createError, isString } from '../utils'

export type StringType = 'string'

export const string = (msg?: string): Rule<StringType, string> => ({
  type: 'string',
  canSkipCheck: true,
  func(ctx) {
    if (!isString(ctx.current)) {
      ctx.errors.push(createError('string', msg, ctx))
    }

    return ctx
  }
})
