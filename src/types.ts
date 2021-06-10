import { FujiConfig } from './fuji';
import type { StringType } from './rules/string';
import type { RequiredType } from './rules/required'
import type { RequiredIfType } from './rules/required-if';
import type { PositiveType } from './rules/positive';
import type { BoolType } from './rules/bool';
import type { IncludesType } from './rules/includes';
import type { OneOfType } from './rules/one-of';
import { CustomRuleI } from './rules/use';

export type ErrorType = StringType
  | RequiredType
  | RequiredIfType
  | PositiveType
  | BoolType
  | IncludesType
  | OneOfType
  | CustomRuleI['Type']
  | 'unsupported-type'


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
