const fs = require(`fs`)
const path = require(`path`)
const _ = require(`lodash`)

module.exports = {
  transforms: {
    LIST_STARTERS() {
      const base = path.join(process.cwd(), 'starters')
      const starters = fs.readdirSync(base)
        .filter(dir => fs.statSync(path.join(base, dir)).isDirectory())
        .reduce((merged, dir) => {
          merged[dir] = JSON.parse(fs.readFileSync(path.join(base, dir, 'package.json'), 'utf8'))
          return merged
        }, {})

      return `
        |Name|Demo|Description|
        |:--:|----|-----------|
        ${Object.keys(starters).map(name => {
          const starter = starters[name]
          return `
            |[${name}](https://github.com/gatsbyjs/gatsby-starter-${name})|[gatsby-starter-${name}-demo.netlify.com](https://gatsby-starter-${name}-demo.netlify.com/)|${starter.description}|
          `.trim()
        }).join('\n')}
      `.replace(/^[^|]+/gm, '')
    },
    STARTER(content, options, { originalPath }) {
      const starter = path.basename(path.dirname(originalPath))
      const template = fs.readFileSync(path.join(process.cwd(), `readme-template.md`), 'utf8')
      return _.template(template)({
        name: starter
      })
    }
  }
}
