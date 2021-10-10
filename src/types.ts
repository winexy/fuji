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
import {
  ShapeMismatchType,
  ShapeMismatchMeta,
  UnknownKeyType,
  UnknownKeyMeta,
  ShapeType
} from './rules/shape'
import { MapType } from './operators/fmap'
import { ArrayOfType } from './rules/array-of'
import { DefaultToType } from './operators/default-to'
import { NullableType } from './rules/nullable'

export type RuleType =
  | NullableType
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
  | UnknownKeyType
  | CustomRuleI['Type']
  | MapType
  | ShapeType
  | ArrayOfType
  | DefaultToType
  | 'unsupported-type'

export type RuleMeta =
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
  | UnknownKeyMeta
  | null

export type ResolveTypeMeta<Type extends RuleType> =
  Type extends ShapeMismatchType
    ? ShapeMismatchMeta
    : Type extends UnknownKeyType
    ? UnknownKeyMeta
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

/** Rule START */
export type RuleCreator = <Value>(...args: any[]) => Rule<RuleType, Value>

export type RuleFunc<A, B = A> = (ctx: VContext<A>) => VContext<B>

export type Rule<Type extends RuleType, A, B = A> = {
  type: Type
  func: RuleFunc<A, B>
}
/** Rule END */

export type VError<Type extends RuleType = RuleType> = {
  type: Type
  message: string
  path: string
  meta: ResolveTypeMeta<Type>
}

export type RuleRunner = {
  <Value>(
    schema: Fuji<RuleType, Value>,
    context: VContext<Value>
  ): VContext<Value>
}

export type VContext<Value> = {
  config: FujiConfig
  errors: VError[]
  path: string[]
  current: Value
  parent: Record<any, any> | null
  root: Record<any, any> | Value
  required: boolean
  nullable: boolean
}

export type ErrorContext<Meta extends RuleMeta | null = null> = {
  valueName: string
  path: string
  meta: Meta
}

export type FormatMessage<Meta extends RuleMeta | null = null> = {
  (context: ErrorContext<Meta>): string
}
export interface ErrorsDictI {
  custom: FormatMessage
}

export type ErrorsDict = ErrorsDictI &
  {
    [Type in RuleType]: ResolveTypeMeta<Type> extends null
      ? FormatMessage
      : FormatMessage<ResolveTypeMeta<Type>>
  }

export type FujiConfig = {
  failFast: boolean
  allowUnknown: boolean
  excludeUndef: boolean
  dict: ErrorsDict
  valueName: string
}

export type Fuji<Types extends RuleType, Value> = {
  rules: Rule<Types, Value>[]
}

/** Infer */
export type Infer<FujiSchema> = FujiSchema extends Fuji<
  infer $RuleType,
  infer Value
>
  ? Value extends AnyShapeSchema
    ? InferRecord<Value>
    : Value extends Array<AnyShapeSchema>
    ? InferArrayOfRecords<Value>[]
    : RequiredType extends $RuleType
    ? NullableType extends $RuleType
      ? Value | null
      : Value
    : DefaultToType extends $RuleType
    ? Value
    : NullableType extends $RuleType
    ? Value | null
    : Value | undefined
  : never

type InferArrayOfRecords<Value extends Array<AnyShapeSchema>> =
  Value extends Array<infer RecordValue>
    ? RecordValue extends AnyShapeSchema
      ? InferRecord<RecordValue>
      : never
    : never

type InferRecord<Shape extends Record<string, Fuji<any, any>>> = {
  [K in RequiredKeys<Shape>]: Infer<Shape[K]>
} &
  {
    [K in OptionalKeys<Shape>]?: Infer<Shape[K]>
  }

type RequiredKeys<T extends AnyShapeSchema> = {
  [K in keyof T]: Rule<RequiredType, any> extends T[K]['rules'][number]
    ? K
    : Rule<DefaultToType, any> extends T[K]['rules'][number]
    ? K
    : never
}[keyof T]

type OptionalKeys<T extends AnyShapeSchema> = Exclude<keyof T, RequiredKeys<T>>
/** Infer END */

export type AnyRecord = Record<any, any>

export type AnyShapeSchema = Record<string, Fuji<any, any>>

export type Result<Types extends RuleType, Value> =
  | {
      invalid: true
      value: null
      errors: VError[]
    }
  | {
      invalid: false
      value: Infer<Fuji<Types, Value>>
      errors: null
    }
