import home from './src/pages/home'
import product from './src/pages/product'
import { router, render } from './lib'
import loginRegForm from './src/pages/auth/login-reg-form'
import Cookies from 'js-cookie'
import adminDashboard from './src/pages/admin'
import adminProduct from './src/pages/admin/product'

const requireAdmin = (done, match) => {
  if (Cookies.get('user') && JSON.parse(Cookies.get('user')).role === 'admin') {
    done()
  } else {
    done(false)
    router.navigate(`/`)
  }
};

router.on('/', () => render(home, document.querySelector('#app')))

router.on('/admin', () => {
  render(adminDashboard, document.querySelector('#app'))
}, { before: requireAdmin })

router.on('/admin/product/:id', async({ data: { id } }) => {
  render(() => adminProduct(id), document.querySelector('#app'))
}, { before: requireAdmin })

router.on('/login', ({ params }) => {
  render(() => loginRegForm(params?.redirect | ''), document.querySelector('#app'))
}, { before: (done) => { if (Cookies.get('user')) { done(false); router.navigate('/') } else { done() } } })

router.on('/product/:id', async ({ data: { id } }) => {
  render(() => product(id), document.querySelector('#app'))
})

router.resolve()