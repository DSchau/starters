const spawn = require(`./spawn`)

module.exports = function setupGitUser({
  name = 'GatsbyJS Bot',
  email = 'admin@gatsbyjs.com',
} = {}) {
  return Promise.all([
    spawn(`git config --global user.name ${name}`),
    spawn(`git config --global user.email ${email}`),
  ])
}
