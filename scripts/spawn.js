const execa = require(`execa`)

module.exports = function spawn(command) {
  const [commandName, ...args] = command.split(/\s+/)
  return execa(commandName, args, { stdio: `inherit` })
    .then(res => console.log(res) || res)
}
