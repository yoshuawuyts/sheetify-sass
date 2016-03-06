const sf = require('sheetify')

sf`
  @import './import.css';
  .foo {
    .bar {
      color: blue;
    }
  }
`
