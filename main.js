import Navigo from 'navigo'
import javascriptLogo from './javascript.svg'
import header from './src/components/header'
import home from './src/pages/home'
import footer from './src/components/footer'
import product from './src/pages/product'
import db from './db.json' assert { type: 'json' }
import slugify from 'slugify'

const router = new Navigo('/')

const render = function(component, name) {
  document.title = name
  document.querySelector('#app').innerHTML = header + component + footer
}

router.on('/', () => render(home, 'Nhà sách Tiki'))

router.on('/product/:id', ({data: {id}}) => {
  const product_data = db.find(book => book.id == id)

  !product_data ? router.navigate('/') : render(product(product_data), product_data.name)
})

router.resolve()