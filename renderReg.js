import { registration, setToken, setName } from './api.js'
import { fetchAndRenederComments } from './index.js'
import { renderLogin } from './renderLogin.js'

export const renderReg = () => {
  const container = document.querySelector('.container')

  const loginHtml = `
     <section class='add-form'>
        <h1>Форма регистрации</h1>
        <input
        type='text'
        class='add-form-name'
        placeholder='Введите имя'
        id='name'
        required
      /input>
      <input
        type='text'
        class='add-form-name'
        placeholder='Введите логин'
        id='login'
        required
      /input>
      <input
        type='password'
        class='add-form-name'
        placeholder='Введите пароль'
        id='password'
        required
      ></input>
      <fieldset class='add-form-registry'>
       <button class='add-form-button-main button-main' type='submit'>
        Зарегистрироваться</button>
      <u class='add-form-button-link entry'>
        Войти</u>
      </fieldset>
     </section>
    `
  container.innerHTML = loginHtml

  document.querySelector('.entry').addEventListener('click', () => {
    renderLogin()
  })

  const nameEl = document.querySelector('#name')
  const loginEl = document.querySelector('#login')
  const passwordEl = document.querySelector('#password')
  const regButtonEl = document.querySelector('.button-main')

  regButtonEl.addEventListener('click', () => {
    registration(nameEl.value, loginEl.value, passwordEl.value)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setToken(data.user.token)
        setName(data.user.name)
        fetchAndRenederComments()
      })

    if (!nameEl.value || !loginEl.value || !passwordEl.value) {
      console.error('заполните форму регистрации')
      alert('Заполните форму регистрации')
      return
    }
  })

}