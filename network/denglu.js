import Music from './index'

function Login() {
  return Music.GETdata('/register/anonimous')
}
module.exports = {
  Login
}