module.exports = ({context, core}) => {
  const issueBody = context.payload.issue.body
  const parsedIssueBody = issueBody.match(/### Repositories\s+```csv(?<repositories>[^`]+)```\s+### Target repository visibility\s+(?<targetRepositoryVisibility>Private|Internal)/)
  
  if (parsedIssueBody) {
    if (core) {
      core.setOutput('repositories', parsedIssueBody.groups.repositories)
      core.setOutput('target-repository-visibility', parsedIssueBody.groups.targetRepositoryVisibility)
    }

    return parsedIssueBody.groups
  }
}
