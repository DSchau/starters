const fs = require(`fs`)
const path = require(`path`)
const _ = require(`lodash`)

module.exports = {
  transforms: {
    STARTER(content, options, { originalPath }) {
      const starter = path.basename(path.dirname(originalPath))
      const template = fs.readFileSync(path.join(process.cwd(), `readme-template.md`), 'utf8')
      return _.template(template)({
        name: starter
      })
    }
  }
}
