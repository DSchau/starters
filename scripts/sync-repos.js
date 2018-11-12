#!/usr/bin/env node
const execa = require(`execa`)
const spawn = require(`./spawn`)

;(async function syncRepos() {
  try {
    const output = await execa(`npm`, [`run`, `changed`])
      .then(({ stdout }) => stdout)
      .catch(() => process.exit(0)) // nothing changed!

    const repos = output.split('\n')
      .filter(line => line.includes('PRIVATE'))
      .map(line => 
        line.replace('(PRIVATE)', '').split('starter-').pop().trim()
      )

    if (repos.length === 0) {
      console.log(`Zero changes detected to starters; skipping publish`)
      return
    }

    await Promise.all(repos.map(repo => spawn(`sh ./scripts/publish-changes.sh ${repo}`)))
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
