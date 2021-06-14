import type { Rule } from '../types'
import { createError, isObject } from '../utils'

export type ObjectType = 'object'

type AnyObject = Record<any, any>

export const object = (msg?: string): Rule<ObjectType, AnyObject> => ({
  type: 'object',
  func(ctx) {
    if (!isObject(ctx.current)) {
      ctx.errors.push(createError('object', msg, ctx))
    }

    return ctx
  }
})
