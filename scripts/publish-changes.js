const execa = require(`execa`)
const spawn = require(`./spawn`)

module.exports = async function publishChanges(name) {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error(`An environment variable containing GITHUB_TOKEN is required`)
  }
  const origin = `https://${process.env.GITHUB_TOKEN}@github.com/dschau/gatsby-starter-${name}.git`
  const commitMessage = `chore: syncing with gatsbyjs/starters monorepo`

  const commands = [
    `cd packages/${name}`,
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
