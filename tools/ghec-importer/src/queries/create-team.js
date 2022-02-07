// graphql

const { Octokit } = require('@octokit/rest')
const Logger = require('../utils/logger')
const proxyAgent = require('../utils/proxy-agent')

module.exports = async (migration, name) => {
  const logger = new Logger(migration)
  const ghecAdminToken = migration.adminToken
  const proxy = proxyAgent()

  const ghecAdminOctokit = new Octokit({
    auth: ghecAdminToken,
    // Embed the proxy agent only if a proxy is used
    ...(proxy.enabled ? { request: { agent: proxy.proxyAgent } } : {})
  })

  const parameters = {
    org: migration.targetOrganization,
    name,
    privacy: 'closed'
  }

  logger.rest('Create team', parameters)

  try {
    const response = await ghecAdminOctokit.teams.create(parameters)

    logger.data('REST API (Create team): Response', response)
  } catch (error) {
    logger.data('REST API (Create team): Error', error)

    if (error.status != 422) {
      throw error
    }
  }
}
