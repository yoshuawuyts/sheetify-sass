const sf = require('sheetify')

sf`
  @import './import.scss';
  @import './indent-import.sass';
  .foo {
    .bar {
      color: blue;
    }
  }
`
