// graphql

const { Octokit } = require('@octokit/rest')
const Logger = require('../utils/logger')
const proxyAgent = require('../utils/proxy-agent')

module.exports = async (migration, query, variables) => {
  const logger = new Logger(migration)

  const ghecAdminToken = migration.adminToken

  const proxy = proxyAgent()

  const ghecAdminOctokit = new Octokit({
    auth: ghecAdminToken,
    // Embed the proxy agent only if a proxy is used
    ...(proxy.enabled ? { request: { agent: proxy.proxyAgent } } : {})
  })

  logger.graphql(query, variables)

  const data = await ghecAdminOctokit.graphql({
    query,
    ...variables,
    headers: {
      'GraphQL-Features': 'gh_migrator_import_to_dotcom'
    }
  })

  logger.graphqlResponse(data)

  return data
}
