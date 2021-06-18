import { runner } from '../runner'
import type { AnyShapeSchema, VContext } from '../types'
import { createContext, isUndef, isObject, createError } from '../utils'
import { Rule } from '../types'

export type ShapeMismatchType = 'shape-mismatch'

export type ShapeMismatchMeta = {
  keys: string[]
}

export type UnknownKeyType = 'unknown-key'

export type UnknownKeyMeta = {
  key: string
}

function getUnknownKeys(allKeys: string[], knownKeys: string[]) {
  const knownSet = new Set(knownKeys)
  return allKeys.filter(key => !knownSet.has(key))
}

function checkUnknownKeys<Shape extends AnyShapeSchema>(
  ctx: VContext<Shape>,
  keys: string[]
): VContext<Shape> {
  const unknownKeys = getUnknownKeys(Object.keys(ctx.current), keys)

  if (unknownKeys.length > 0) {
    ctx.errors.push(
      ...unknownKeys.map(key =>
        createError('unknown-key', undefined, ctx, { key })
      )
    )
  }

  return ctx
}

export type ShapeType = 'shape'

export const shape = <Shape extends AnyShapeSchema>(
  schema: Shape
): Rule<ShapeType, Shape> => ({
  type: 'shape',
  func(ctx) {
    const keys: Array<keyof Shape> = Object.keys(schema)
    const { failFast, allowUnknown, excludeUndef } = ctx.config

    if (!isObject(ctx.current)) {
      ctx.errors.push(
        createError('shape-mismatch', undefined, ctx, {
          keys: keys as string[]
        })
      )
      return ctx
    }

    let nextContext = !allowUnknown
      ? checkUnknownKeys(ctx, keys as string[])
      : ctx

    const result: Partial<Shape> = {}

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
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

      const { errors, current: resultValue } = runner(
        value,
        createContext(current, config, {
          path: [...path, key.toString()],
          parent: currentParent,
          root
        })
      )

      if (!isUndef(resultValue) || !excludeUndef) {
        result[key] = resultValue
      }

      nextContext.errors.push(...errors)

      if (failFast && errors.length > 0) {
        return nextContext
      }
    }

    nextContext.current = result as Shape

    return nextContext
  }
})
