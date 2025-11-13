# checks-action [![ts](https://github.com/int128/checks-action/actions/workflows/ts.yaml/badge.svg)](https://github.com/int128/checks-action/actions/workflows/ts.yaml)

This is a general-purpose action for GitHub Checks API.

## Getting Started

### Create a check run

```yaml
jobs:
  test:
    steps:
      - uses: int128/checks-action@v1
        with:
          operation: create-check-run
          check-run-name: example-check
```

### Get a check run

```yaml
jobs:
  test:
    steps:
      - uses: int128/checks-action@v1
        with:
          operation: get-check-run
          check-run-name: example-check
```

## Specification

You need to specify the `operation` input to choose which operation to perform.
Either of:

- `create-check-run`: Create a check run
- `get-check-run`: Get a check run

### `create-check-run` operation

Inputs:

| Name             | Default               | Description                         |
| ---------------- | --------------------- | ----------------------------------- |
| `check-run-name` | (required)            | The name of the check run to create |
| `sha`            | Inferred from context | The commit SHA for the check run    |
| `title`          | (required)            | The title of the check run          |
| `summary`        | (required)            | The summary of the check run        |
| `text`           | -                     | The text of the check run           |
| `details-url`    | -                     | The details URL of the check run    |

Outputs:

| Name           | Description             |
| -------------- | ----------------------- |
| `check-run-id` | The ID of the check run |

### `get-check-run` operation

Inputs:

| Name             | Default               | Description                      |
| ---------------- | --------------------- | -------------------------------- |
| `check-run-name` | (required)            | The name of the check run to get |
| `sha`            | Inferred from context | The commit SHA for the check run |

Outputs:

| Name                | Description                  |
| ------------------- | ---------------------------- |
| `check-run-id`      | The ID of the check run      |
| `check-run-title`   | The title of the check run   |
| `check-run-summary` | The summary of the check run |
| `check-run-text`    | The text of the check run    |
