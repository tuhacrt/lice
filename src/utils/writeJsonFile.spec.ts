import { expect, it, vi } from 'vitest'

import { writeJsonFile } from './writeJsonFile'

it('should return sorted dependency information', () => {
  const path = 'path/to/package'
  const dependencies = [
    {
      name: 'license-checker-rseidelsohn',
      version: '4.2.11',
      license: 'MIT',
    },
    {
      name: 'typescript',
      version: '5.5.4',
      license: 'Apache-2.0',
      repository: 'https://github.com/Microsoft/TypeScript',
      licenseText: '',
    },
  ]

  vi.mock('node:fs', async () => ({
    ...(await vi.importActual<typeof import('node:fs')>('node:fs')),
    writeFileSync: vi.fn(),
  }))

  expect(writeJsonFile(path, dependencies, '.'))
    .toEqual(`{
  \"Apache-2.0\": {
    \"typescript\": {
      \"license\": \"Apache-2.0\",
      \"licenseText\": \"\",
      \"repository\": \"https://github.com/Microsoft/TypeScript\",
      \"version\": \"5.5.4\"
    }
  },
  \"MIT\": {
    \"license-checker-rseidelsohn\": {
      \"license\": \"MIT\",
      \"version\": \"4.2.11\"
    }
  }
}`)
})
