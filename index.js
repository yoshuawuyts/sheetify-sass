const sass = require('node-sass')

module.exports = sheetifySass

// SASS plugin for Sheetify
// (str, str, obj, fn) -> null
function sheetifySass (filename, source, options, done) {
  const sassOpts = {
    data: source,
    file: filename
  }
  sass.render(sassOpts, function (err, res) {
    if (err) return done(err)
    done(null, String(res.css))
  })
}
