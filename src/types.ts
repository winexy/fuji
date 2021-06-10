export type ErrorType = unknown

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
