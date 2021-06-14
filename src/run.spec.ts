import {
  arrayOf,
  f,
  map,
  max,
  minLength,
  number,
  numeric,
  oneOf,
  pattern,
  positive,
  required,
  run,
  string,
  use
} from '.'
import { expectTypeOf } from 'expect-type'

describe('run', () => {
  test('should correctly transform value', () => {
    const schema = f.shape({
      name: f(
        string(),
        required(),
        map(name => `${name}!`)
      ),
      version: f(
        pattern(/\d+\.\d+.\d+/),
        map(version => version.split('.').map(Number))
      ),
      workspaces: f(
        arrayOf(
          f(
            string(),
            map(workspace => workspace.toUpperCase())
          )
        ),
        map(workspaces => workspaces.map(w => w.split('').join('_'))),
        map(workspaces => workspaces.join('::'))
      ),
      repository: f.shape({
        type: f(
          string(),
          required(),
          oneOf(['git', 'vcs']),
          map(s => s.split('').reverse().join(''))
        ),
        url: f(
          string(),
          use(
            // @ts-expect-error
            'https',
            s => s.startsWith('https://'),
            'url should start with https'
          ),
          map(url => url.slice(0, 8).toUpperCase())
        )
      })
    })

    const result = run(schema, {
      name: 'mylib',
      version: '17.0.0',
      workspaces: ['abc', 'zxc'],
      repository: {
        type: 'git',
        url: 'https://github.com'
      }
    })

    expectTypeOf(result.value!.name).toEqualTypeOf<string>()
    expectTypeOf(result.value!.version).toEqualTypeOf<number[] | undefined>()
    expectTypeOf(result.value!.workspaces).toEqualTypeOf<string | undefined>()
    expectTypeOf(result.value!.repository!.type).toEqualTypeOf<string>()
    expectTypeOf(result.value!.repository!.url).toEqualTypeOf<
      string | undefined
    >()

    expect(result.invalid).toBeFalse()
    expect(result.value).toEqual({
      name: 'mylib!',
      version: [17, 0, 0],
      workspaces: 'a_b_c::z_x_c',
      repository: {
        type: 'tig',
        url: 'HTTPS://'
      }
    })
    expect(result.errors).toBeNull()
  })

  test('should return valid value as is', () => {
    const schema = f.shape({
      name: f(string(), required()),
      version: f(pattern(/\d+\.\d+.\d+/)),
      workspaces: f.array(f(string())),
      repository: f.shape({
        type: f(string(), required(), oneOf(['git', 'vcs'])),
        url: f(
          string(),
          use(
            // @ts-expect-error
            'https',
            s => s.startsWith('https://'),
            'url should start with https'
          )
        )
      })
    })

    const result = run(schema, {
      name: 'mylib',
      version: '17.0.0',
      workspaces: ['abc', 'zxc'],
      repository: {
        type: 'git',
        url: 'https://github.com'
      }
    })

    expect(result.invalid).toBeFalse()
    expect(result.value).toEqual({
      name: 'mylib',
      version: '17.0.0',
      workspaces: ['abc', 'zxc'],
      repository: {
        type: 'git',
        url: 'https://github.com'
      }
    })
    expect(result.errors).toBeNull()
  })

  test('should return correct result for invalid value', () => {
    const schema = f.shape({
      name: f(
        string(),
        required(),
        map(name => name.toUpperCase())
      ),
      version: f(
        pattern(/\d+\.\d+.\d+/),
        map(version => version.split('.'))
      ),
      workspaces: f.array(
        f(
          string(),
          map(w => w[0])
        )
      )
    })

    const result = run(schema, {
      name: 'lib',
      version: '17',
      workspaces: []
    })

    expect(result.invalid).toBeTrue()
    expect(result.value).toBeNull()
    expect(result.errors).toBeArrayOfSize(1)
  })

  test('should correctly transform single value', () => {
    const schema = f(
      string(),
      numeric(),
      map(x => parseInt(x))
    )

    const { value } = run(schema, '42')

    expect(value).toBe(42)
  })

  test('should return transformed value without mutating input', () => {
    const schema = f.shape({
      user: f.shape({
        name: f(
          string(),
          map(n => n.toUpperCase())
        ),
        email: f(
          string(),
          map(s => s.trim()),
          map(s => s.toLowerCase())
        )
      })
    })

    const NAME = 'bot'
    const EMAIL = ' bOt@ExaMple.COM        '

    const data = {
      user: {
        name: NAME,
        email: EMAIL
      }
    }

    const result = run(schema, data)

    expect(result.value).toEqual({
      user: {
        name: NAME.toUpperCase(),
        email: EMAIL.trim().toLowerCase()
      }
    })

    expect(data).toEqual({
      user: {
        name: NAME,
        email: EMAIL
      }
    })
  })
})

describe('failFast', () => {
  test.each`
    failFast | expectedSize
    ${true}  | ${1}
    ${false} | ${3}
  `(
    'when failFast=$failFast expected errors size $expectedSize',
    ({ failFast, expectedSize }) => {
      const schema = f(number(), positive(), max(100))

      const { errors } = run(schema, 'not_a_number', {
        failFast
      })

      expect(errors).toBeArrayOfSize(expectedSize)
    }
  )

  test.each`
    failFast | expectedSize
    ${true}  | ${1}
    ${false} | ${5}
  `(
    'when failFast=$failFast expected errors size $expectedSize',
    ({ failFast, expectedSize }) => {
      const schema = f.shape({
        price: f(number(), positive(), max(100)),
        login: f(string(), minLength(1))
      })

      const { errors } = run(
        schema,
        {
          price: 'login',
          login: 42
        },
        {
          failFast
        }
      )

      expect(errors).toBeArrayOfSize(expectedSize)
    }
  )
})

describe('allowUnknown', () => {
  test('should forbid unknown properties', () => {
    const schema = f.shape({
      id: f(number(), positive()),
      nickname: f(string(), minLength(1))
    })

    const HOW_ABOUT = 'howAbout'
    const OR = 'or'

    const { errors } = run(schema, {
      id: 4,
      nickname: 'winexy',
      [HOW_ABOUT]: 'that?',
      [OR]: 'that?'
    })

    expect(errors).toBeArrayOfSize(2)
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'unknown-key',
          meta: { key: HOW_ABOUT },
          message: `value has unknown key: ${HOW_ABOUT}`
        }),
        expect.objectContaining({
          type: 'unknown-key',
          meta: { key: OR },
          message: `value has unknown key: ${OR}`
        })
      ])
    )
  })

  it('should allow uknown properties', () => {
    const schema = f.shape({
      id: f(number(), positive()),
      nickname: f(string(), minLength(1))
    })

    const { errors } = run(
      schema,
      {
        id: 4,
        nickname: 'winexy',
        howAbout: 'that?',
        or: 'that?'
      },
      {
        allowUnknown: true
      }
    )

    expect(errors).toBeNull()
  })
})
