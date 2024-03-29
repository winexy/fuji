import { runner } from '../runner'
import type { RuleType, Fuji, Rule } from '../types'
import { createContext } from '../utils'

export type ArrayOfType = 'array-of'

export const arrayOf = <Type extends RuleType, Value>(
  schema: Fuji<Type, Value>
): Rule<ArrayOfType, Value[]> => ({
  type: 'array-of',
  canSkipCheck: true,
  func(context) {
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
})
