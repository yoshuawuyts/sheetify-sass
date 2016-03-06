const sf = require('sheetify')

sf`
  @import './import.scss';
  .foo {
    .bar {
      color: blue;
    }
  }
`
