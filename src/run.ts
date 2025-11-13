import * as core from '@actions/core'
import type { Octokit } from '@octokit/action'
import type { Context } from './github.js'

type CreateInputs = {
  checkRunName: string
  title: string
  summary: string
  text?: string
  sha?: string
}

export const create = async (inputs: CreateInputs, octokit: Octokit, context: Context): Promise<void> => {
  core.info(`Creating a check run: ${inputs.checkRunName}`)
  const { data: created } = await octokit.checks.create({
    owner: context.repo.owner,
    repo: context.repo.repo,
    name: inputs.checkRunName,
    head_sha: inputs.sha ?? inferHeadShaFromContext(context),
    output: {
      title: inputs.title,
      summary: inputs.summary,
      text: inputs.text,
    },
    status: 'completed',
    conclusion: 'success',
  })
  core.info(`Created a check run: ${created.html_url}`)
}

const inferHeadShaFromContext = (context: Context): string => {
  if ('pull_request' in context.payload) {
    core.info(`Using head SHA ${context.payload.pull_request.head.sha} from pull_request event`)
    return context.payload.pull_request.head.sha
  }
  if ('workflow_run' in context.payload && context.payload.workflow_run != null) {
    core.info(`Using head SHA ${context.payload.workflow_run.head_sha} from workflow_run event`)
    return context.payload.workflow_run.head_sha
  }
  core.info(`Using head SHA ${context.sha} from context`)
  return context.sha
}
