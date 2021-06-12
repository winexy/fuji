import { FujiConfig } from './fuji'
import { VContext, ErrorType } from './types'

export const isUndef = (v: any): v is undefined => v === undefined

export const isFunc = (v: unknown): v is (...args: any[]) => any =>
  typeof v === 'function'

export const isObject = (value: unknown): value is AnyRecord => {
  return value !== null && typeof value === 'object'
}

export const isString = (value: unknown): value is string =>
  typeof value === 'string'

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number'

export const isBool = (value: unknown): value is boolean =>
  typeof value === 'boolean'

export function log(...args: any) {
  globalThis.console.log(...args)
}

export const createError = (
  type: ErrorType,
  msg = '',
  ctx: VContext,
  meta: Record<string, any> = {}
) => {
  const path = ctx.path.join('.')
  const { dict } = ctx.config
  const errContext = { ...ctx, joinedPath: path, meta }
  const message = msg || dict[type](errContext)

  return {
    type,
    message,
    path,
    meta
  }
}

export const createContext = <Value>(
  value: Value,
  config: FujiConfig,
  override: Partial<VContext<Value>> = {}
): VContext<Value> => ({
  current: value,
  errors: [],
  path: [],
  config,
  parent: null,
  root: value,
  required: false,
  ...override
})
