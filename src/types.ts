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
import { ShapeMismatchType, ShapeMismatchMeta } from './rules/shape'

export type ErrorType =
  | ShapeMismatchType
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
  | ShapeMismatchMeta
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
  | null

export type ResolveTypeMeta<Type extends ErrorType> =
  Type extends ShapeMismatchType
    ? ShapeMismatchMeta
    : Type extends RequiredIfType
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
    : Type extends CustomRuleI['Type']
    ? CustomRuleMeta
    : null

export type Fuji<Value> = {
  rules: VFunc<Value>[]
}

export type VFunc<A, B = A> = (ctx: VContext<A>) => VContext<B>

export type VError<Type extends ErrorType = ErrorType> = {
  type: Type
  message: string
  path: string
  meta: ResolveTypeMeta<Type>
}

export type RuleRunner = {
  <Value>(schema: Fuji<Value>, context: VContext<Value>): VContext<Value>
}

export type VContext<Value> = {
  config: FujiConfig
  errors: VError[]
  path: string[]
  current: Value
  parent: Record<any, any> | null
  root: Record<any, any> | Value
  required: boolean
}

export type ErrorContext<Meta extends ErrorMeta | null = null> = {
  valueName: string
  path: string
  meta: Meta
}

export type Infer<FujiSchema> = FujiSchema extends Fuji<infer Value>
  ? Value extends Record<string, Fuji<any>>
    ? InferRecord<Value>
    : Value extends Array<Record<any, Fuji<any>>>
    ? InferArrayOfRecords<Value>[]
    : Value
  : never

type InferArrayOfRecords<Value extends Array<Record<any, Fuji<any>>>> =
  Value extends Array<infer RecordValue>
    ? RecordValue extends Record<any, Fuji<any>>
      ? InferRecord<RecordValue>
      : never
    : never

type InferRecord<Shape extends Record<string, Fuji<any>>> = {
  [K in keyof Shape]: Infer<Shape[K]>
}

export type FormatMessage<Meta extends ErrorMeta | null = null> = {
  (context: ErrorContext<Meta>): string
}
export interface ErrorsDict {
  string: FormatMessage
  bool: FormatMessage
  includes: FormatMessage<IncludesMeta>
  'unsupported-type': FormatMessage
  required: FormatMessage
  'required-if': FormatMessage<RequiredIfMeta>
  'one-of': FormatMessage<OneOfMeta>
  positive: FormatMessage
  negative: FormatMessage
  custom: FormatMessage
  number: FormatMessage
  object: FormatMessage
  array: FormatMessage
  'equal-to': FormatMessage<EqualToMeta>
  'equal-with': FormatMessage
  between: FormatMessage<BetweenMeta>
  even: FormatMessage
  odd: FormatMessage
  max: FormatMessage<MaxMeta>
  min: FormatMessage<MinMeta>
  'max-length': FormatMessage<MaxLengthMeta>
  'min-length': FormatMessage<MinLengthMeta>
  pattern: FormatMessage<PatternMeta>
  numeric: FormatMessage
  int: FormatMessage
  'shape-mismatch': FormatMessage<ShapeMismatchMeta>
}

export type FujiConfig = {
  failFast: boolean
  allowUnknown: boolean
  dict: ErrorsDict
  valueName: string
}

export type AnyRecord = Record<any, any>
