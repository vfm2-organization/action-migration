#!/usr/bin/env node
require('dotenv').config()
const commander = require('commander')
const program = new commander.Command()

const { command: prepareArchiveCommand } = require('./src/commands/prepare-archive')
const importCommand = require('./src/commands/import')
const auditCommand = require('./src/commands/audit')
const auditSummaryCommand = require('./src/commands/audit-summary')
const getDetailsCommand = require('./src/commands/get-details')
const { command: makeInternalCommand } = require('./src/commands/make-internal')
const listRepositoriesCommand = require('./src/commands/list-repositories')
const { command: deleteRepositoriesCommand } = require('./src/commands/delete-repositories')

async function run() {
  program.addCommand(prepareArchiveCommand())
  program.addCommand(importCommand())
  program.addCommand(auditCommand())
  program.addCommand(auditSummaryCommand())
  program.addCommand(makeInternalCommand())
  program.addCommand(listRepositoriesCommand())
  program.addCommand(deleteRepositoriesCommand())
  program.addCommand(getDetailsCommand())

  try {
    await program.parseAsync(process.argv)
  } catch (error) {
    console.error(error)
    process.exit(200)
  }
}

run()
