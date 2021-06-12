import type { VFunc } from '../types'
import { createError, isUndef } from '../utils'

export type RequiredType = 'required'


export const required = <Value extends any = any>(
  msg?: string
): VFunc<Value> => {
  return function RequiredV8N(ctx) {
    ctx.required = true

    if (isUndef(ctx.current) || ctx.current === '') {
      ctx.errors.push(createError('required', msg, ctx))
    }

    return ctx
  }
}