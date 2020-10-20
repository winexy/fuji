export type Fuji<T> = {
  rules: VFunc<T>[];
}

export type VFunc<T = any> = (ctx: VContext<T>) => VContext<T>;
export type VError = {
  type: string;
  message: string;
  path: string;
  meta: Record<string, any>
};
export type VContext<T = any> = { 
  errors: VError[];
  path: string[]; 
  original: T;
  current: T;
  root: any;
};


export type RequiredIfPredicate = (root: VContext['root'], value: any) => boolean;
export type TransformFunc<T> = (current: T, original: T) => T;
export type ShapeSchema<T> = Record<string, Fuji<T>>;
