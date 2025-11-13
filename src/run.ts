import * as core from '@actions/core'
import type { Octokit } from '@octokit/action'
import type { Context } from './github.js'

export const createCheckRun = async (octokit: Octokit, context: Context): Promise<void> => {
  const checkRunName = core.getInput('check-run-name', { required: true })
  const title = core.getInput('title', { required: true })
  const summary = core.getInput('summary', { required: true })
  const text = core.getInput('text') || undefined
  const detailsUrl = core.getInput('details-url') || undefined
  const sha = core.getInput('sha') || undefined

  core.info(`Creating a check run: ${checkRunName}`)
  const { data: created } = await octokit.checks.create({
    owner: context.repo.owner,
    repo: context.repo.repo,
    name: checkRunName,
    head_sha: sha ?? inferHeadShaFromContext(context),
    output: {
      title: title,
      summary: summary,
      text: text,
    },
    details_url: detailsUrl,
    status: 'completed',
    conclusion: 'success',
  })
  core.info(`Created a check run: ${created.html_url}`)
  core.setOutput('check-run-id', created.id)
}

export const getCheckRun = async (octokit: Octokit, context: Context): Promise<void> => {
  const checkRunName = core.getInput('check-run-name', { required: true })
  const sha = core.getInput('sha') || undefined

  core.info(`Getting a check run: ${checkRunName}`)
  const { data: checkRuns } = await octokit.checks.listForRef({
    owner: context.repo.owner,
    repo: context.repo.repo,
    ref: sha ?? inferHeadShaFromContext(context),
    check_name: checkRunName,
  })
  if (checkRuns.total_count === 0) {
    core.warning(`No check run found with name: ${checkRunName}`)
    return
  }
  const checkRun = checkRuns.check_runs[0]
  core.info(`Found a check run: ${checkRun.html_url}`)
  core.setOutput('check-run-id', checkRun.id)
  core.setOutput('check-run-title', checkRun.output?.title ?? '')
  core.setOutput('check-run-summary', checkRun.output?.summary ?? '')
  core.setOutput('check-run-text', checkRun.output?.text ?? '')
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
