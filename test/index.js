const browserify = require('browserify')
const path = require('path')
const test = require('tape')
const bl = require('bl')
const fs = require('fs')

test('sheetify-sass', function (t) {
  t.plan(2)

  t.test('should transform sass and scss', function (t) {
    const expected = fs.readFileSync(path.join(__dirname, 'expected.css'))

    t.plan(4)

    const files = new Set()
    browserify(path.join(__dirname, 'source.js'))
      .on('transform', function (transform) {
        transform.on('file', function (filename) {
          files.add(filename)
        })
      })
      .transform('sheetify', {
        transform: [ './' ]
      })
      .plugin('css-extract', {
        out: createWs
      })
      .bundle()

    function createWs () {
      return bl(function (err, buf) {
        t.ifError(err, 'no error')
        t.equal(String(buf).trim(), String(expected).trim())

        t.ok(files.has(path.join(__dirname, 'import.scss')))
        t.ok(files.has(path.join(__dirname, 'indent-import.sass')))
      })
    }
  })

  t.test('should bubble up errors', function (t) {
    t.plan(2)

    browserify(path.join(__dirname, 'error.js'))
      .transform('sheetify', {
        transform: [ './' ]
      })
      .bundle(function (err) {
        t.ok(err)
        t.ok(/Invalid CSS/.test(err.message))
      })
  })
})
