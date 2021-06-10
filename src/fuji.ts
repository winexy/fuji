import type { VContext, VFunc, VError, Fuji } from './types';
import { createContext } from './utils';
import { ErrorType, ErrContext } from './types';

export function validate<T>(
  schema: Fuji<T>,
  context: VContext
): VContext {
  return schema.rules.reduce(
    (ctx, f) => f(ctx), context
  );
}

export type FujiConfig = {
  failFast: boolean,
  allowUnknown: boolean,
  dict: Record<ErrorType, (context: ErrContext) => string>
}

export const DEFAULT_DICT: FujiConfig['dict'] = {
}

export const DEFAULT_CONFIG: FujiConfig = {
  failFast: false,
  allowUnknown: false,
  dict: DEFAULT_DICT
}

function createConfig(config: Partial<FujiConfig>): FujiConfig {
  return { ...config, ...DEFAULT_CONFIG }
}

function runWith<T>(schema: Fuji<T>, v: T, config: Partial<FujiConfig> = DEFAULT_CONFIG): VError[] {
  const configuration = createConfig(config)
  const context = createContext<T>(v, configuration)
  const { errors } = validate<T>(schema, context);
  return errors;
}

const fuji = <T>(...rules: VFunc<T>[]): Fuji<T> => ({ rules });

export { fuji, runWith };