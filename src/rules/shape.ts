import { runner } from '../fuji'
import type { Fuji, VFunc } from '../types'
import { createContext, isUndef, isObject, createError } from '../utils'

export type ShapeMismatchType = 'shape-mismatch'

export type ShapeMismatchMeta = {
  keys: string[]
}

export const shape = <Shape extends Record<string, Fuji<any>>>(
  schema: Shape
): VFunc<Shape> => {
  return function ShapeOfV8N(ctx) {
    const keys: Array<keyof Shape> = Object.keys(schema)

    if (!isObject(ctx.current)) {
      ctx.errors.push(
        createError('shape-mismatch', undefined, ctx, {
          keys: keys as string[]
        })
      )
      return ctx
    }
      const { parent, root, path, config } = ctx
      const value = schema[key]

      const hasParent = !isUndef(parent)

      const parentKey = path[path.length - 1]
      // at root level we have no parent, so we use root as parent
      const currentParent =
        hasParent && isObject(parent) ? parent[parentKey] : root

      // getting "current" value accessing key from parent or root if its a root level
      const current =
        hasParent && isObject(currentParent) ? currentParent[key] : root[key]

      const result = runner(
        value,
        createContext(current, config, {
          path: [...path, key.toString()],
          parent: currentParent,
          root
        })
      )

      parentContext.errors.push(...result.errors)

      return parentContext
    }, ctx)
  }
}
