import { FujiConfig } from './fuji'
import type { StringType } from './rules/string'
import type { RequiredType } from './rules/required'
import type { RequiredIfMeta, RequiredIfType } from './rules/required-if'
import type { PositiveType } from './rules/positive'
import type { BoolType } from './rules/bool'
import type { IncludesMeta, IncludesType } from './rules/includes'
import type { OneOfMeta, OneOfType } from './rules/one-of'
import type { CustomRuleI, CustomRuleMeta } from './rules/use'
import type { ArrayType } from './rules/array'
import type { EqualToMeta, EqualToType } from './rules/equal-to'
import type { BetweenMeta, BetweenType } from './rules/between'
import type { EqualWithMeta, EqualWithType } from './rules/equal-with'
import type { EvenType } from './rules/even'
import type { InstanceOfMeta, InstanceOfType } from './rules/instance-of'
import type { MaxMeta, MaxType } from './rules/max'
import type { MaxLengthMeta, MaxLengthType } from './rules/max-length'
import type { IntType } from './rules/int'
import type { MinLengthMeta, MinLengthType } from './rules/min-length'
import type { NegativeType } from './rules/negative'
import type { NumberType } from './rules/number'
import type { ObjectType } from './rules/object'
import type { OddType } from './rules/odd'
import type { PatternMeta, PatternType } from './rules/pattern'
import type { NumericType } from './rules/numeric'
import type { MinMeta, MinType } from './rules/min'

export type ErrorType =
  | StringType
  | RequiredType
  | RequiredIfType
  | PositiveType
  | BoolType
  | IncludesType
  | OneOfType
  | ArrayType
  | EqualToType
  | EqualWithType
  | BetweenType
  | EvenType
  | InstanceOfType
  | MaxType
  | MinType
  | MaxLengthType
  | IntType
  | MinLengthType
  | NegativeType
  | NumberType
  | ObjectType
  | OddType
  | PatternType
  | NumericType
  | CustomRuleI['Type']
  | 'unsupported-type'

export type ErrorMeta =
  | RequiredIfMeta
  | IncludesMeta
  | MaxLengthMeta
  | MinLengthMeta
  | MaxMeta
  | MinMeta
  | PatternMeta
  | OneOfMeta
  | EqualToMeta
  | EqualWithMeta
  | BetweenMeta
  | InstanceOfMeta
  | null

export type ResolveTypeMeta<Type extends ErrorType> =
  Type extends RequiredIfType
    ? RequiredIfMeta
    : Type extends IncludesType
    ? IncludesMeta
    : Type extends MaxLengthType
    ? MaxLengthMeta
    : Type extends MinLengthType
    ? MinLengthMeta
    : Type extends MaxType
    ? MaxMeta
    : Type extends MinType
    ? MinMeta
    : Type extends PatternType
    ? PatternMeta
    : Type extends OneOfType
    ? OneOfMeta
    : Type extends EqualToType
    ? EqualToMeta
    : Type extends EqualWithType
    ? EqualWithMeta
    : Type extends BetweenType
    ? BetweenMeta
    : Type extends InstanceOfType
    ? InstanceOfMeta
    : Type extends CustomRuleI['Type']
    ? CustomRuleMeta
    : null

}

export type VFunc<T = any> = (
  ctx: VContext<VContext['root'], T>
) => VContext<VContext['root'], T>
export type VError = {
  type: string
  message: string
  path: string
  meta: Record<string, any>
}
export type VContext<R = any, T = any> = {
  config: FujiConfig
  errors: VError[]
  path: string[]
  original: T
  current: T
  root: R
}

export type ErrContext<R = any, T = any, Meta = any> = {
  joinedPath: string
  meta: Meta
} & VContext<R, T>

export type RequiredIfPredicate = (
  root: VContext['root'],
  value: any
) => boolean
export type TransformFunc<T> = (current: T, original: T) => T
export type ShapeSchema<T> = Record<string, Fuji<T>>
