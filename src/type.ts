import type { ModuleInfo } from 'license-checker-rseidelsohn'

type Prettify<T> = { [K in keyof T]: T[K] } & {}

export type License = {
  name: string
  version?: string
  license?: string | Array<string>
  repository?: string
  licenseText?: string
}

export type ModuleInfoWithFromLicense = Prettify<ModuleInfo & { fromLicense: boolean }>
