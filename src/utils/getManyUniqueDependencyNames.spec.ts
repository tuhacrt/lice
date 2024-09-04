import { expect, it } from 'vitest'

import { getManyUniqueDependencyNames } from './getManyUniqueDependencyNames'

it('should return unique dependency names', () => {
  const dependencies = {
    dependencies: {
      dependency1: '1.0.1',
      dependency2: '2.0.0',
    },
    devDependencies: {
      dependency1: '1.0.0',
    },
  }

  expect(getManyUniqueDependencyNames(dependencies))
    .toEqual(expect.arrayContaining(['dependency1', 'dependency2']))
})
