# Push CED source files

Github Action to push source files to CloudEdgeDistribution.

## Inputs

### `cli-token`

CloudEdgeDistribution CLI token. If not specified it'll try to resolve the CLI token from environment variable `CED_CLI_TOKEN`.

### `environment`

Environment to use in CloudEdgeDistribution. If not specified it'll try to resolve it from environment variable `CED_ENVIRONMENT`, it'll use the default environment in ced.json otherwise.

### `path`

Path to the CloudEdgeDistribution project. If not specified it'll try to resolve it from environment variable `CED_PROJECT_PATH`, it'll use current folder otherwise.

## Example usage

```yaml
- uses: MerthinTechnologies/push-ced-source-action@v1
  with:
    path: ${{ env.PROJECT_PATH }}
    cli-token: ${{ secrets.CED_CLI_TOKEN }}
    environment: 'production'
```
