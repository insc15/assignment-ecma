import Navigo from 'navigo'
import javascriptLogo from './javascript.svg'
import header from './src/components/header'
import home from './src/pages/home'

const router = new Navigo('/')

const render = function(component) {
  document.querySelector('#app').innerHTML = header + component
}

router.on('/', () => render(home))

router.resolve()