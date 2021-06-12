import type { Fuji, VFunc } from '../types'
import { validate } from '../fuji'

export const arrayOf = <T>(schema: Fuji<T>): VFunc =>
  function ArrayOfV8N(context) {
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
