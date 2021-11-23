# ghec-importer

A command-line utility for importing repositories into GitHub Enterprise Cloud.

## Prerequisites

This utility uses a GraphQL API (the same as ECI) that is only available for Professional Services customers.  
Please [contact them](https://services.github.com/#contact) for access and questions.

## Setup

```sh
cd ghec-importer
npm install
npm link
```

## Commands

```
$ ghec-importer -h
Usage: ghec-importer [options] [command]

Options:
  -h, --help                                display help for command

Commands:
  prepare-archive [options] <archive-path>  Creates a new migration archive without the models specified in the -r|--remove option
  import [options] <archive-path>           Import a migration archive into GitHub.com
  audit [options]                           Lists all migratable resources for a given GUID in a comma separated list (CSV)
  audit-summary [options]                   Lists repositories and teams as well as total number of imported/to be imported records for a given
                                            GUID
  make-internal [options]                   Change the visibility of repositories for a given GUID to internal
  list-repositories [options]               Lists repositories for a given GUID
  delete-repositories [options]             Delete imported repositories for a given GUID
  help [command]                            display help for command
```

### prepare-archive

```sh
$ ghec-importer prepare-archive -h
Usage: ghec-importer prepare-archive [options] <archive-path>

Creates a new migration archive without the models specified in the -r|--remove option

Options:
  -r, --remove <models>        projects (all projects), org-teams (teams that don't belong to migrated repositories)
  -o, --output-path <string>   directory to create the new migration archive in (default: ".")
  -s, --staging-path <string>  directory to be used for storing files during preparation (default: "tmp")
  -S, --suffix <string>        suffix to be appended to the new migration archive (default: "prepared")
  -d, --debug                  display debug output
  -h, --help                   display help for command
```

### import

```sh
$ ghec-importer import -h
Usage: ghec-importer import [options] <archive-path>

Import a migration archive into GitHub.com

Options:
  -a, --admin-token <string>             the personal access token (with admin:org scope) of an organization owner of the GitHub.com target
                                         organization
  -t, --target-organization <string>     the GitHub.com organization to import into
  -r, --remove <models>                  comma-separated list of models to remove before importing: projects (all projects), org-teams (teams
                                         that don't belong to migrated repositories)
  --resolve-repository-renames <string>  resolve repository name conflicts by renaming the repository name, can be org-prefix or guid-suffix
  --disallow-team-merges                 disallow automatically merging teams, new teams will be created instead (default: false)
  -I, --make-internal                    change the visibility of migrated repositories to internal after the migration (default: false)
  -D, --delete-repositories              prompt to delete migrated repositories after the migration completes (useful for dry-runs and
                                         debugging) (default: false)
  -u, --user-mappings-path <string>      path to a csv file that contains user mappings to be applied before the import
                                         (source,target\nuser-source,user-target)
  -d, --debug                            display debug output
  -h, --help                             display help for command
```

### audit

```sh
$ ghec-importer audit -h
Usage: ghec-importer audit [options]

Lists all migratable resources for a given GUID in a comma separated list (CSV)

Options:
  -g, --guid <string>                 the GUID of the migration
  -a, --admin-token <string>          the personal access token (with admin:org scope) of an organization owner of the GitHub.com target
                                      organization
  -t, --target-organization <string>  the GitHub.com organization the migration belongs to
  -d, --debug                         display debug output
  -h, --help                          display help for command
```

### audit-summary

```sh
$ ghec-importer audit-summary -h
Usage: ghec-importer audit-summary [options]

Lists repositories and teams as well as total number of imported/to be imported records for a given GUID

Options:
  -g, --guid <string>                 the GUID of the migration
  -a, --admin-token <string>          the personal access token (with admin:org scope) of an organization owner of the GitHub.com target
                                      organization
  -t, --target-organization <string>  the GitHub.com organization the migration belongs to
  -d, --debug                         display debug output
  -h, --help                          display help for command
```

### list-repositories

```sh
❯ ghec-importer list-repositories -h
Usage: ghec-importer list-repositories [options]

Lists repositories for a given GUID

Options:
  -g, --guid <string>                 the GUID of the migration
  -a, --admin-token <string>          the personal access token (with admin:org scope) of an organization owner of the GitHub.com target
                                      organization
  -t, --target-organization <string>  the GitHub.com organization the migration belongs to
  -d, --debug                         display debug output
  -h, --help                          display help for command
```

### delete-repositories

```sh
$ ghec-importer delete-repositories -h
Usage: ghec-importer delete-repositories [options]

Delete imported repositories for a given GUID

Options:
  -g, --guid <string>                 the GUID of the migration
  -a, --admin-token <string>          the personal access token (with admin:org scope) of an organization owner of the GitHub.com target
                                      organization
  -t, --target-organization <string>  the GitHub.com organization the migration belongs to
  -y, --yes                           do not prompt for confirmation
  -d, --debug                         display debug output
  -h, --help                          display help for command
```
