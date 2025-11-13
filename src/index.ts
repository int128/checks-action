import * as core from '@actions/core'
import { getContext, getOctokit } from './github.js'
import { createCheckRun, getCheckRun } from './run.js'

const main = async (): Promise<void> => {
  const operation = core.getInput('operation', { required: true })
  if (operation === 'create') {
    await createCheckRun(getOctokit(), await getContext())
  } else if (operation === 'get') {
    await getCheckRun(getOctokit(), await getContext())
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
