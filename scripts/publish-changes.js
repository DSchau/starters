const execa = require(`execa`)
const path = require(`path`)

const spawn = require(`./spawn`)

module.exports = async function publishChanges(name) {
  if (!process.env.GH_TOKEN) {
    throw new Error(`An environment variable containing GH_TOKEN is required`)
  }
  const origin = `https://${process.env.GH_TOKEN}@github.com/dschau/gatsby-starter-${name}.git`
  const base = process.env.CIRCLE_WORKING_DIRECTORY || path.resolve()
  const commitMessage = `chore: syncing with gatsbyjs/starters monorepo`

  const commands = [
    `cd ${base}`,
    `cd starters/${name}`,
    `git init`,
    `git remote add origin ${origin}`,
    `git fetch origin/master`,
    `git add .`,
    [`git`, `commit`, `--message`, commitMessage],
    `git push origin master`,
  ]

  for (let command of commands) {
    if (Array.isArray(command)) {
      const [commandName, ...args] = command
      await execa(commandName, args, { stdio: 'inherit' })
    } else {
      await spawn(command)
    }
  }
}
