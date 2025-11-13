import * as core from '@actions/core'
import { getContext, getOctokit } from './github.js'
import { create } from './run.js'

const main = async (): Promise<void> => {
  const operation = core.getInput('operation', { required: true })
  if (operation === 'create') {
    await create(
      {
        checkName: core.getInput('check-name', { required: true }),
        title: core.getInput('title', { required: true }),
        summary: core.getInput('summary', { required: true }),
        text: core.getInput('text'),
        sha: core.getInput('sha'),
      },
      getOctokit(),
      await getContext(),
    )
  } else {
    throw new Error(`Unsupported operation: ${operation}`)
  }
}

try {
  await main()
} catch (e) {
  core.setFailed(e instanceof Error ? e : String(e))
  console.error(e)
}
