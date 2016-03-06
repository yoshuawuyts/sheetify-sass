const browserify = require('browserify')
const path = require('path')
const test = require('tape')
const bl = require('bl')
const fs = require('fs')

test('sheetify-sass', function (t) {
  t.test('should transform sass', function (t) {
    const expected = fs.readFileSync(path.join(__dirname, 'expected.css'))

    t.plan(2)
    browserify(path.join(__dirname, 'source.js'))
      .transform('sheetify/transform', {
        use: [ './' ]
      })
      .plugin('css-extract', {
        out: createWs
      }).bundle()

    function createWs () {
      return bl(function (err, buf) {
        t.ifError(err, 'no error')
        t.equal(String(buf).trim(), String(expected).trim())
      })
    }
  })
})
