import { DEFAULT_CONFIG } from './defaults'
import { AnyRecord, ResolveTypeMeta } from './types'
import {
  VContext,
  RuleType,
  ErrorContext,
  FormatMessage,
  VError,
  FujiConfig
} from './types'

export const isUndef = (v: any): v is undefined => v === undefined

export const isFunc = (v: unknown): v is (...args: any[]) => any =>
  typeof v === 'function'

export const isObject = (value: unknown): value is AnyRecord => {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export const isString = (value: unknown): value is string =>
  typeof value === 'string'

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number'

export const isBool = (value: unknown): value is boolean =>
  typeof value === 'boolean'

export const isNil = (value: unknown): value is null | undefined =>
  value === null || value === undefined

export function log(...args: any) {
  globalThis.console.log(...args)
}

export const createError = <Type extends RuleType>(
  type: Type,
  userMessage: string | undefined,
  ctx: VContext<any>,
  meta: ResolveTypeMeta<Type> | null = null
): VError => {
  const path = ctx.path.join('.')
  const { dict, valueName } = ctx.config
  const errorContext: ErrorContext<typeof meta> = { path, meta, valueName }
  const formatMessage = dict[type] as FormatMessage<typeof meta>

  const DEFAULT_MESSAGE = 'not-specified'
  const message =
    isUndef(userMessage) && isFunc(formatMessage)
      ? formatMessage(errorContext) ?? DEFAULT_MESSAGE
      : userMessage ?? DEFAULT_MESSAGE

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

export function createConfig(config: Partial<FujiConfig>): FujiConfig {
  return { ...DEFAULT_CONFIG, ...config }
}
