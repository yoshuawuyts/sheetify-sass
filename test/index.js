const browserify = require('browserify')
const path = require('path')
const test = require('tape')
const bl = require('bl')

const sheetifySass = require('./')

test('sheetify-sass', function (t) {
  t.test('should transform sass', function (t) {
    t.plan(1)
    browserify(path.join(__dirname, 'source.js'))
      .transform('sheetify/transform', {
        use: [ sheetifySass ]
      })
      .plugin('css-extract', {
        out: createWs
      }).bundle()

    function createWs () {
      return bl(function (err, buf) {
        t.ifError(err, 'no error')
        console.error(String(buf))
      })
    }
  })
})
