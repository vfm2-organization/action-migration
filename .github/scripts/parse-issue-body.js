module.exports = ({context, core}) => {
  const issueBody = context.payload.issue.body
  const parsedIssueBody = issueBody.match(/### Repositories\s+```csv(?<repositories>[^`]+)```\s+### Target repository visibility\s+(?<targetRepositoryVisibility>Private|Internal)/)
  
  if (parsedIssueBody) {
    if (core) {
      const repos = parsedIssueBody.groups.repositories.trim().split(/\s+/).map(function(entry) {
        const parts = entry.split('/')
        return {
          url: entry,
          name: parts[parts.length - 1],
          org: parts[parts.length - 2],
          host: 
        }
      })

      core.setOutput('repositories-json', JSON.stringify(repos))
      core.setOutput('repositories', parsedIssueBody.groups.repositories)
      core.setOutput('target-repository-visibility', parsedIssueBody.groups.targetRepositoryVisibility)
    }

    return parsedIssueBody.groups
  }
}
