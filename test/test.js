import assert from 'power-assert'

import App from './sample/app'

describe('Sample', () => {
  it('App', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const s = new App(div)
    assert(s.$el.textContent === 'Sample text')
  })
})
