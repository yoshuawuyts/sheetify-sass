const sass = require('node-sass')
const extend = require('xtend')

module.exports = sheetifySass

// SASS plugin for Sheetify
// (str, str, obj, fn) -> null
function sheetifySass (filename, source, options, done) {
  const sassOpts = extend({
    data: source,
    file: filename,
    indentedSyntax: /\.sass$/i.test(filename)
  }, options)

  sass.render(sassOpts, function (err, res) {
    if (err) return done(err)
    done(null, String(res.css))
  })
}
