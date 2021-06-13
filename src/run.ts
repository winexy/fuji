import { DEFAULT_CONFIG } from './defaults'
import { runner } from './runner'
import { Fuji, FujiConfig, Infer, Result } from './types'
import { createConfig, createContext } from './utils'

export function run<Value>(
  schema: Fuji<Value>,
  value: any,
  config: Partial<FujiConfig> = DEFAULT_CONFIG
): Result<Value> {
  const configuration = createConfig(config)
  const context = createContext<Value>(value as Value, configuration)
  const output = runner<Value>(schema, context)

  if (output.errors.length > 0) {
    return {
      invalid: true,
      errors: output.errors,
      value: null
    }
  }

  return {
    invalid: false,
    value: output.current as Infer<Fuji<Value>>,
    errors: null
  }
}
