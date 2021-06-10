import type { VFunc } from '../types'
import { createError } from '../utils'

export type ObjectType = 'object'

export const object = (msg?: string): VFunc<object> =>
  function ObjectV8N(ctx) {
    if (ctx.current === null || typeof ctx.current !== 'object') {
      ctx.errors.push(createError('object', msg, ctx))
    }

    return ctx
  }
