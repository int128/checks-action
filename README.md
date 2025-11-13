# checks-action [![ts](https://github.com/int128/checks-action/actions/workflows/ts.yaml/badge.svg)](https://github.com/int128/checks-action/actions/workflows/ts.yaml)

This is a general-purpose action for GitHub Checks API.

## Getting Started

### Create a check

```yaml
jobs:
  test:
    steps:
      - uses: int128/checks-action@v1
        with:
          operation: create
          check-name: example-check
```

## Specification

| Name        | Default    | Description                                           |
| ----------- | ---------- | ----------------------------------------------------- |
| `operation` | (required) | The operation to perform. Either of `create` or `get` |

### `create` operation

Inputs:

| Name         | Default               | Description                     |
| ------------ | --------------------- | ------------------------------- |
| `check-name` | (required)            | The name of the check to create |
| `sha`        | Inferred from context | The commit SHA for the check    |
| `title`      | (required)            | The title of the check          |
| `summary`    | (required)            | The summary of the check        |
| `text`       | -                     | The text of the check           |

Outputs:

| Name      | Description    |
| --------- | -------------- |
| `example` | example output |
