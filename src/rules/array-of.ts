import { runner } from '../runner'
import type { Fuji, Rule } from '../types'
import { createContext } from '../utils'

export const arrayOf = <Value>(schema: Fuji<Value>): Rule<Value[]> => {
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
