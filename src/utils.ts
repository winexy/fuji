import { FujiConfig } from './fuji'
import { VContext, ErrorType } from './types'

export const isUndef = (v: any): v is undefined => v === undefined

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

export const createContext = <R>(
  value: R,
  config: FujiConfig
): VContext<R> => ({
  original: value,
  current: value,
  root: value,
  errors: [],
  path: [],
  config
})
