# Migrate to GitHub.com

## Step 1: Add users to user-mappings.csv file

First you need to add your users to `user-mappings.csv` file in the following format:

```csv
source,target
u0001,steffen
```

To do this, create a pull request to this repository with changes to `user-mappings.csv` file.

## Step 2: Create an issue from template

Create an issue from template to specify source repositories.
Go to issues -> [New issue](https://github.com/steffen-inc-migration-org/valet-migrations/issues/new/choose) -> Get Started

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
It will lock your source repository and make it **unaccessible** for your users.
