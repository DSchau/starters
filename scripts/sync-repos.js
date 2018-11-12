#!/usr/bin/env node
const execa = require(`execa`)

;(async function syncRepos() {
  try {
    const changed = await execa(`npm`, [`run`, `changed`])
      .then(({ stdout }) => stdout)
      .catch(e => process.exit(0)) // nothing changed!

    const repos = changed.split('\n')
      .filter(line => line.includes('PRIVATE'))
      .map(line => 
        line.replace('(PRIVATE)', '').split('starter-').pop().trim()
      )

    if (repos.length === 0) {
      return
    }

    await Promise.all(repos.map(repo => execa(`sh ./scripts/publish-changes.sh ${repo}`)))
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
