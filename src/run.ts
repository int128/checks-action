import * as core from '@actions/core'
import type { Octokit } from '@octokit/action'
import type { Context } from './github.js'

type CreateInputs = {
  checkName: string
  title: string
  summary: string
  text?: string
  sha?: string
}

export const create = async (inputs: CreateInputs, octokit: Octokit, context: Context): Promise<void> => {
  core.info(`Creating check run ${inputs.checkName}`)
  const { data: created } = await octokit.checks.create({
    owner: context.repo.owner,
    repo: context.repo.repo,
    name: inputs.checkName,
    head_sha: inputs.sha ?? context.sha,
    output: {
      title: inputs.title,
      summary: inputs.summary,
      text: inputs.text,
    },
  })
  core.info(`Created check run: ${created.html_url}`)
}
