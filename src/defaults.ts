import { ErrorsDict, FormatMessage, FujiConfig, ErrorContext } from './types'

const shouldBeTypeOf = (type: string): FormatMessage => {
  return ctx => `${name(ctx)} should be type of ${type}`
}

const name = (ctx: ErrorContext<any>): string => {
  if (ctx.path) {
    return `"${ctx.path}"`
  }

  return ctx.valueName === DEFAULT_CONFIG.valueName
    ? ctx.valueName
    : `"${ctx.valueName}"`
}

export const DEFAULT_DICT: ErrorsDict = {
  string: shouldBeTypeOf('string'),
  bool: shouldBeTypeOf('bool'),
  number: shouldBeTypeOf('number'),
  object: shouldBeTypeOf('object'),
  array: shouldBeTypeOf('array'),
  int: shouldBeTypeOf('int'),
  includes: ctx => `${name(ctx)} should include ${ctx.meta.target}`,
  ['unsupported-type']: ctx => `${name(ctx)} has unsupported type`,
  required: ctx => `${name(ctx)} is required`,
  'required-if': ctx => `${name(ctx)} is required`,
  'one-of': ctx =>
    `${name(ctx)} should be one of [${ctx.meta.variants.join(', ')}]`,
  positive: ctx => `${name(ctx)} should be positive`,
  custom: () => 'custom error',
  'equal-to': ctx => `${name(ctx)} should be equal to ${ctx.meta.target}`,
  'equal-with': ctx => `${name(ctx)} is not equal to expected value`,
  between: ctx =>
    `${name(ctx)} should be in between ${ctx.meta.left} and ${ctx.meta.right}`,
  odd: ctx => `${name(ctx)} should be odd`,
  even: ctx => `${name(ctx)} should be even`,
  max: ctx => `${name(ctx)} should not exceed ${ctx.meta.limit}`,
  min: ctx => `${name(ctx)} should be greater than ${ctx.meta.limit}`,
  'min-length': ctx =>
    `${name(ctx)} should have length greater than ${ctx.meta.limit}`,
  'max-length': ctx =>
    `${name(ctx)} should have length less than ${ctx.meta.limit}`,
  negative: ctx => `${name(ctx)} should be negative`,
  pattern: ctx => `${name(ctx)} should match ${ctx.meta.regex}`,
  numeric: ctx => `${name(ctx)} should be numeric`,
  'shape-mismatch': ctx =>
    `${name(ctx)} has invalid shape. Missing keys: ${ctx.meta.keys.join(', ')}`,
  'unknown-key': ctx => `${name(ctx)} has unknown key: ${ctx.meta.key}`,
  fmap: () => 'todo',
  'array-of': () => 'todo',
  shape: () => 'todo',
  use: () => 'todo',
  'default-to': () => 'todo',
  nullable: () => 'todo'
}

export const DEFAULT_CONFIG: FujiConfig = {
  failFast: false,
  allowUnknown: false,
  excludeUndef: true,
  dict: DEFAULT_DICT,
  valueName: 'value'
}
