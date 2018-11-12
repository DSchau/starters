#!/usr/bin/env node
const fs = require(`fs-extra`)
const path = require(`path`)
const spawn = require(`./spawn`)

;(async function syncRepos() {
  try {
    const starters = path.join(process.cwd(), 'starters')
    const repos = await fs.readdir(starters)
      .then(dirs => dirs.filter(dir => fs.statSync(path.join(starters, dir)).isDirectory()))

    await Promise.all(repos.map(repo => spawn(`sh ./scripts/publish-changes.sh ${repo}`)))
  } catch (e) {
    process.exit(1)
  }
})()
