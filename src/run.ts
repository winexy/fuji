import { DEFAULT_CONFIG } from './defaults'
import { runner } from './runner'
import { RuleType, Fuji, FujiConfig, Infer, Result } from './types'
import { createConfig, createContext } from './utils'

export function run<Types extends RuleType, Value>(
  schema: Fuji<Types, Value>,
  value: any,
  config: Partial<FujiConfig> = DEFAULT_CONFIG
): Result<Types, Value> {
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
    value: output.current as Infer<Fuji<Types, Value>>,
    errors: null
  }
}
