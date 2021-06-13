import { DEFAULT_CONFIG } from './defaults'
import { runner } from './runner'
import { Fuji, FujiConfig, VError } from './types'
import { createConfig, createContext } from './utils'

export function run<Value>(
  schema: Fuji<Value>,
  value: unknown,
  config: Partial<FujiConfig> = DEFAULT_CONFIG
): VError[] {
  const configuration = createConfig(config)
  const context = createContext<Value>(value as Value, configuration)
  const { errors } = runner<Value>(schema, context)

  return errors
}
