import { ErrorsDict, FormatMessage, FujiConfig } from './types'

const shouldBeTypeOf = (type: string): FormatMessage => {
  return ctx => `"${ctx.path || ctx.valueName}" should be type of ${type}`
}

export const DEFAULT_DICT: ErrorsDict = {
  string: shouldBeTypeOf('string'),
  bool: shouldBeTypeOf('bool'),
  number: shouldBeTypeOf('number'),
  object: shouldBeTypeOf('object'),
  array: shouldBeTypeOf('array'),
  int: shouldBeTypeOf('int'),
  includes: ctx =>
    `"${ctx.path || ctx.valueName}" should include ${ctx.meta.target}`,
  ['unsupported-type']: ctx =>
    `"${ctx.path || ctx.valueName}" has unsupported type`,
  required: ctx => `"${ctx.path || ctx.valueName}" is required`,
  'required-if': ctx => `"${ctx.path || ctx.valueName}" is required`,
  'one-of': ctx =>
    `"${ctx.path || ctx.valueName}" should be one of [${ctx.meta.variants.join(
      ', '
    )}]`,
  positive: ctx => `"${ctx.path || ctx.valueName}" should be positive`,
  custom: () => 'custom error',
  'equal-to': ctx =>
    `"${ctx.path || ctx.valueName}" should be equal to ${ctx.meta.target}`,
  'equal-with': ctx =>
    `"${ctx.path || ctx.valueName}" is not equal to expected value`,
  between: ctx =>
    `"${ctx.path || ctx.valueName}" should be in between ${ctx.meta.left} and ${
      ctx.meta.right
    }`,
  odd: ctx => `"${ctx.path || ctx.valueName}" should be odd`,
  even: ctx => `"${ctx.path || ctx.valueName}" should be even`,
  max: ctx =>
    `"${ctx.path || ctx.valueName}" should not exceed ${ctx.meta.limit}`,
  min: ctx =>
    `"${ctx.path || ctx.valueName}" should be greater than ${ctx.meta.limit}`,
  'instance-of': ctx =>
    `"${ctx.path || ctx.valueName}" should be instance of ${
      ctx.meta.Constructor
    }`,
  'min-length': ctx =>
    `"${ctx.path || ctx.valueName}" should have length greater than ${
      ctx.meta.limit
    }`,
  'max-length': ctx =>
    `"${ctx.path || ctx.valueName}" should have length less than ${
      ctx.meta.limit
    }`,
  negative: ctx => `"${ctx.path || ctx.valueName}" should be negative`,
  pattern: ctx =>
    `"${ctx.path || ctx.valueName}" should match ${ctx.meta.regex}`,
  numeric: ctx => `"${ctx.path || ctx.valueName}" should be numeric`
}

export const DEFAULT_CONFIG: FujiConfig = {
  failFast: false,
  allowUnknown: false,
  dict: DEFAULT_DICT,
  valueName: 'value'
}
