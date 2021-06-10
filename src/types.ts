import { FujiConfig } from './fuji';
import type { StringType } from './rules/string';
import type { RequiredType } from './rules/required';
import type { RequiredIfType } from './rules/required-if';
import type { PositiveType } from './rules/positive';
import type { BoolType } from './rules/bool';
import type { IncludesType } from './rules/includes';
import type { OneOfType } from './rules/one-of';
import type { CustomRuleI } from './rules/use';
import type { ArrayType } from './rules/array';
import type { EqualToType } from './rules/equal-to';
import type { BetweenType } from './rules/between';
import type { EqualWithType } from './rules/equal-with';
import type { EvenType } from './rules/even';
import type { InstanceOfType } from './rules/instance-of';
import type { MaxType } from './rules/max';
import type { MaxLengthType } from './rules/max-length';
import type { IntType } from './rules/int';
import type { MinLengthType } from './rules/min-length';
import type { NegativeType } from './rules/negative';
import type { NumberType } from './rules/number';
import type { ObjectType } from './rules/object';
import type { OddType } from './rules/odd';
import type { PatternType } from './rules/pattern';
import type { NumericType } from './rules/numeric';
import type { MinType } from './rules/min';

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
  | 'unsupported-type';

export type Fuji<T> = {
  rules: VFunc<T>[];
}

export type VFunc<T = any> = (ctx: VContext<VContext['root'], T>) => VContext<VContext['root'], T>;
export type VError = {
  type: string;
  message: string;
  path: string;
  meta: Record<string, any>
};
export type VContext<R = any, T = any> = {
  config: FujiConfig;
  errors: VError[];
  path: string[];
  original: T;
  current: T;
  root: R;
};

export type ErrContext<R = any, T = any, Meta = any> = {
  joinedPath: string,
  meta: Meta
} & VContext<R, T>

export type RequiredIfPredicate = (root: VContext['root'], value: any) => boolean;
export type TransformFunc<T> = (current: T, original: T) => T;
export type ShapeSchema<T> = Record<string, Fuji<T>>;
