import { VContext } from './types';

export const isUndef = (v: any): v is undefined =>
  v === undefined;

export function log(...args: any) {
  globalThis.console.log(...args);
}

export const createError = (
  type: string,
  message = '', 
  ctx: VContext,
  meta: Record<string, any> = {}
) => ({
  type,
  message,
  path: ctx.path.join('.'),
  meta
});

export const createContext = <T>(value: T): VContext => ({
  original: value,
  current: value,
  root: value,
  errors: [],
  path: []
});
