#!/usr/bin/env node
const spawn = require(`./spawn`)

const setupGitUser = require(`./setup-git-user`)
const publishChanges = require(`./push-repo-changes`)

const CHANGED_PACKAGE_EXPR = /^(.+)\(PRIVATE\)/m
;(async function syncRepos() {
  try {
    const changed = await spawn(`npm run changed`)
      .then(({ stdout }) => stdout)
      .catch(e => process.exit(0)) // nothing changed!

    const repos = (changed.match(CHANGED_PACKAGE_EXPR) || []).map(repo =>
      repo.trim()
    )

    if (repos.length === 0) {
      return
    }

    await setupGitUser()

    await Promise.all(repos.map(repo => publishChanges(repo)))
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()