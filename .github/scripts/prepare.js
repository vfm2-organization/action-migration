const parseIssueBody = require('./parse-issue-body.js')

module.exports = async ({github, context, options}) => {
  const { repositories, targetRepositoryVisibility } = parseIssueBody({context})
  let commentBody
  
  if (repositories && targetRepositoryVisibility) {
    commentBody = `👋 Thank you for opening this migration issue.
  
    The following **${repositories.trim().split('\n').length} repositories** have been parsed from your issue body:
  
    \`\`\`${repositories}\`\`\`
  
    The **target organization** is set to be: **\`${ options.targetOrganization }\`**
    The **target repository visibility** is set to be: **\`${ targetRepositoryVisibility }\`**
  
    <details>
      <summary><b>Troubleshooting</b></summary>
  
    If the parsed repositories are not matching the repositories listed in your issue body, you can edit the issue body and make sure it's correct. List your repositories in a code block as this one:
  
    \`\`\`
    https://source.example.com/your-org/your-repository-1
    https://source.example.com/your-org/your-repository-2
    \`\`\`
    </details>
  
    ## Run the migration
  
    Add a comment to this issue with one of the following two commands in order to run a migration:
  
    **Dry-run**
  
    We recommend to do a "dry-run" migration first which **will not lock your source repository** and therefore does not block your users from continuing to work on the repository.
  
    \`\`\`
    /run-dry-run-migration
    \`\`\`
  
    **Production**
  
    After you have verified your "dry-run" migration and after you have announced the production migration to your users, create a comment with the following command to start the production migration. It **will lock your source repository** and make it unaccessible for your users.
  
    \`\`\`
    /run-production-migration
    \`\`\`
    `
  } else {
    commentBody = '😢 The issue body could not be parsed. Please open a new issue using an issue template.'
  }
  
  await github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: commentBody.replace(/  +/g, '')
  })
}
