import type { Rule } from '../types'
import { createError, isObject } from '../utils'

export type ObjectType = 'object'

type AnyObject = Record<any, any>

export const object = (msg?: string): Rule<AnyObject> => {
  return function ObjectV8N(ctx) {
    if (!isObject(ctx.current)) {
      ctx.errors.push(createError('object', msg, ctx))
    }

    return ctx
  }
}
