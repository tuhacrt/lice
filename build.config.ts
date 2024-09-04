import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/commands/lice',
  ],
  rollup: {
    emitCJS: true,
  },
  declaration: true,
  clean: true,
})
