import { runner } from '../fuji'
import type { Fuji, VFunc } from '../types'
import { createContext } from '../utils'

export const arrayOf = <Value>(schema: Fuji<Value>): VFunc<Value[]> => {
  return function ArrayOfV8N(context) {
    if (Array.isArray(context.current)) {
      return context.current.reduce((ctx, current, index) => {
        const res = runner(
          schema,
          createContext(current, ctx.config, {
            path: [...ctx.path, index.toString()],
            parent: ctx.parent,
            root: ctx.root
          })
        )

        context.errors.push(...res.errors)

        return ctx
      }, context)
    }

    return context
  }
}
