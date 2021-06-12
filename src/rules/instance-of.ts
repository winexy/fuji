import type { VFunc } from '../types'
import { createError } from '../utils'

export type InstanceOfType = 'instance-of'

export type InstanceOfMeta = {
  Constructor: Function
}

  function InstanceOfV8N(ctx) {
    if (ctx.current instanceof Constructor) {
      ctx.errors.push(createError('instance-of', msg, ctx))
    }

    return ctx
  }
