// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'lib',
    rules: {
      'ts/array-type': ['error', { default: 'generic' }],
      'ts/consistent-type-definitions': ['error', 'type'],
      'import/order': [
        'error',
        {
          'alphabetize': { order: 'asc', caseInsensitive: true },
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'unknown'],
          'newlines-between': 'always',
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    },
  },
)
