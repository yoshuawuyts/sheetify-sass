const sf = require('sheetify')

sf`
  @import './import.scss';
  @import './indent-import.sass';
  :host .foo {
    .bar {
      color: blue;
    }
  }
`
