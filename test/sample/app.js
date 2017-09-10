import Slightly from '../../src/slightly'

export default class App extends Slightly {
  $composeDom (el) {
    el.textContent = 'Sample text'
  }
}
