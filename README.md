# Migrate to GitHub.com

## Step 1: Add users to user-mappings.csv file

First you need to add your users to `user-mappings.csv` file in the following format:

```csv
source,target
u0001,steffen
```

If migrating with GitHub Enterprise Importer (GEI), create `user-mappings.csv` in the following format:

```csv
mannequin-user,mannequin-id,target-user
u0001,u0001,steffen
```

To do this, create a pull request to this repository with changes to `user-mappings.csv` file.

## Step 2: Create an issue from template

Create an issue from template to specify source repositories.
Go to issues -> [New issue](https://github.com/github/migrations-via-actions-v3-from-gitlab-ghes-to-ghec/issues/new/choose) -> Get Started

Specify repositories to migrate in issue's body.
> **Tip**: You can specify multiple repositories in one issue.

Submit the issue.

## Step 3: Perform a dry-run migration

Dry-run migration will not lock your source repository and therefore does not block your users from continuing to work on the source repository.

Add the following comment to the issue to perform a dry-run migration:

```
/run-dry-run-migration
```

## Step 4: Verify migrated repository

Verify that migration was completed successfully.

In order to delete the migrated repositories of the dry-run, add a comment with the following command:
```
/delete-repositories GUID
```

## Step 5: Perform production migration

After you have verified your dry-run migration and after you have announced the production migration to your users, create a comment with the following command to start the production migration:
```
/run-production-migration
```
It will lock your source repository and make it **inaccessible** for your users.

## Repo Setup Guide

When using this codebase to migrate repos in your own organization, here are a few things that will need to be created/modified:

### Issue Labels

Create the following [issue labels](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels#creating-a-label):

1. `github-enterprise-server` (for ghes)
2. `external-gitlab` (for gitlab)
3. `internal-gitlab` (for gitlab)
4. `migration` (for all)
5. `gei` (for ghes)

### Variables

Create these [variables](https://docs.github.com/en/actions/learn-github-actions/variables#creating-configuration-variables-for-a-repository) on the repository that is hosting this migration utility:

| Variable                      | Description                                                                            | Needed For   |
|-----------------------------|----------------------------------------------------------------------------------------|------------- |
| GHEC_TARGET_ORGANIZATION    | Name of target organization in GitHub.com (eg: `myorg`)                                | GHES, GitLab |
| GHES_ADMIN_USERNAME         | GitHub Enterprise server admin username                                                | GHES         |
| GITLAB_USERNAME             | GitLab username                                                                        | GitLab       |
| GITLAB_API_ENDPOINT         | GitLab API URL without the slash at the end; eg: `https://gitlab.example.com/api/v4`   | GitLab       |

### Secrets

Create these [secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) on the repository that is hosting this migration utility:

| Secret                      | Description                                                                            | Needed For   |
|-----------------------------|----------------------------------------------------------------------------------------|------------- |
| GHEC_ADMIN_TOKEN            | PAT of account with permissions in target org in GitHub.com                            | GHES, GitLab |
| GHES_ADMIN_TOKEN            | GitHub Enterprise Server admin console password/token                                  | GHES         |
| GITLAB_API_PRIVATE_TOKEN    | GitLab API Token                                                                       | GitLab       |
| GEI_AZURE_CONNECTION_STRING | Connection string for an Azure storage account (required for GEI).                     | GHES         |

### Runner Setup

Configure a runner on the repository that can access the GitHub Enterprise Server or GitLab instance.

For GHES: Add the machine's SSH public key SSH to the [GitHub Enterprise Server admin console](https://docs.github.com/en/enterprise-server@3.4/admin/configuration/configuring-your-enterprise/accessing-the-administrative-shell-ssh#enabling-access-to-the-administrative-shell-via-ssh). The script needs to be able to SSH into the GitHub Enterprise Server instance. Instructions on creating and/or exporting the public key are below:
- [Creating public key](https://git-scm.com/book/en/v2/Git-on-the-Server-Generating-Your-SSH-Public-Key)
- Export public key to console: `cat ~/.ssh/id_rsa.pub`

If necessary, update the self-hosted runner label in [.github/workflows/migration-github-enterprise-server.yml#L12](/.github/workflows/migration-github-enterprise-server.yml#L12) so that it picks up the designated runner - the runner label otherwise defaults to `self-hosted`.

### Workflow Modifications

**For GHES**:

1. Update the `ghes-ssh-host` in [.github/workflows/migration-github-enterprise-server.yml#L13](/.github/workflows/migration-github-enterprise-server.yml#L13)
    - it should be in the format of: `github.company.com`
2. Update the `user-mappings-source-url` in [.github/workflows/migration-github-enterprise-server.yml#L23](/.github/workflows/migration-github-enterprise-server.yml#L23)
    - it should be in the format of: `https://github.example.com`

**For GitLab**:

1. Update the GitLab URL for internal GitLab migrations in [.github/workflows/migration-external-gitlab.yml#L21](/.github/workflows/migration-external-gitlab.yml#L21)
2. Update the GitLab URL for external GitLab migrations in [.github/workflows/migration-internal-gitlab.yml#L24](/.github/workflows/migration-internal-gitlab.yml#L24)

**For GEI**:

1. If not running on a Ubuntu runner, or if you don't want to automatically install the pre-requisites, switch the `env.INSTALL_PREREQS` to `'false'` in
[.github/workflows/shared-github-enterprise-cloud-gei.yml#L26](/.github/workflows/shared-github-enterprise-cloud-gei.yml#L26)
2. Ensure that the `GHES_ADMIN_TOKEN` has the [appropriate PAT scopes](https://docs.github.com/en/early-access/enterprise-importer/preparing-to-migrate-with-github-enterprise-importer/managing-access-for-github-enterprise-importer#required-scopes-for-personal-access-tokens) for running a migration (source organization) or has been [granted the migrator role](https://docs.github.com/en/early-access/enterprise-importer/preparing-to-migrate-with-github-enterprise-importer/granting-the-migrator-role)
3. Note that the `/delete-repositories` functionality does not work for cleaning up GEI-migrated repositories


### Note on GitLab Exports

Working through the `gl-exporter` ruby runtime [requirements](/tools/gl-exporter/docs/Requirements.md) can sometimes be tricky. It's possible to build and push the [Dockerfile](/tools/gl-exporter/Dockerfile) to the repository and run as a container job:

```
jobs:
  export:
    name: Export
    runs-on: ${{ inputs.runner }}
    container:
      image: 'ghcr.io/${{ github.repository }}:latest'
      credentials:
         username: ${{ github.ref }}
         password: ${{ secrets.GITHUB_TOKEN }}
```

### Note on Tools

This repo isn't intended to have the latest copies of the [ghec-importer](https://github.com/github/ghec-importer) and [gl-exporter](https://github.com/github/gl-exporter). If desired, grab the latest versions of the code and update the copy in the `./tools` directory.
