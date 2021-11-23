# Migration to GitHub.com

## Add users to user-mappings.csv file

First you need to add users to `user-mappings.csv` file in the following format:
| source | target |
| --- | --- |
| steffenhiller | steffen |

To do this, create a pull request to this repository with changes to `user-mappings.csv` file.

## Create an issue from template

Create an issue from template to specify source repositories.
Go to issues -> New issue -> Get Started

![Create new issue from template](/img/img_1.png)

Specify repositories to migrate in issue's body.
> :warning: **Tip**: You can specify multiple repositories in one issue.

![Specify repositories for migration](/img/img_2.png)

Submit the issue.

## Perform a dry-run migration

Dry-run migration will not lock your source repository and therefore does not block your users from continuing to work on the source repository.

Add a comment `/run-dry-run-migration` to an issue to perform a dry-run migration.

![Run dry-run migration](/img/img_3.png)

## Verify migrated repository

Verify that migration was completed successfully.

![Verify migration](/img/img_4.png)

In order to delete the migrated repositories of the dry-run, add a comment with the following command:
```
/delete-repositories
```

## Perform production migration

After you have verified your "dry-run" migration and after you have announced the production migration to your users, create a comment with the following command to start the production migration:
```
/run-production-migration
```
It will lock your source repository and make it **unaccessible** for your users.
