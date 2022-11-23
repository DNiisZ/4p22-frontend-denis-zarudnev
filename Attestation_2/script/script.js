'use strict'

const formNode = document.querySelector('[data-js-form]')

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const validateInput = (inputNode) => {
  const paramsString = inputNode.getAttribute('data-js-input')
  const paramsObject = JSON.parse(paramsString)
  const {
    type,
    passwordConfirmInputID,
    originalPasswordInputID,
  } = paramsObject

  const errorNode = inputNode.querySelector('[data-js-input-error]')
  const controlNode = inputNode.querySelector('[data-js-input-control]')
  const value = controlNode.value.trim()
  const isEmpty = value.length === 0

  const isPasswordConfirmationValid = () => {
    const passwordConfirmInputNode = document.getElementById(passwordConfirmInputID)
    const passwordConfirmInputValue = passwordConfirmInputNode.value
    const isPasswordConfirmEmpty = passwordConfirmInputValue.length = 0
    const isPasswordConfirmEqual = passwordConfirmInputValue === value

    return !isPasswordConfirmEmpty && isPasswordConfirmEqual
  }

  if (type === 'email') {
    const isEmailCorrect = validateEmail(value)

    if (isEmpty) {
      errorNode.innerHTML = 'Поле обязательно для заполнения'
      controlNode.classList.add('is-invalid')
      return false
    } else if (!isEmailCorrect) {
      errorNode.innerHTML = 'Email введён некорректно'
      controlNode.classList.add('is-invalid')
      return false
    }

    const hasAnyError = isEmpty || !isEmailCorrect
    controlNode.classList.toggle('is-invalid', hasAnyError)

    if (!hasAnyError) {
      errorNode.innerHTML = ''
    }
  }

  if (type === 'password') {
    if (isEmpty) {
      errorNode.innerHTML = 'Поле обязательно для заполнения'
      controlNode.classList.add('is-invalid')
      return false
    } else if (value.length < 8) {
      errorNode.innerHTML = 'Пароль должен содержать не менее 8 символов'
      controlNode.classList.add('is-invalid')
      return false
    } else {
      errorNode.innerHTML = ''
      controlNode.classList.remove('is-invalid')
    }
  }
    if (type === 'password-confirmation') {
      if (isEmpty) {
        errorNode.innerHTML = 'Поле обязательно для заполнения'
        controlNode.classList.add('is-invalid')
        return false
      }
      else if (type === 'password-confirmation') {
      errorNode.innerHTML = 'Пароли не совпадают'
      controlNode.classList.add('is-invalid')
      return false
    }
    else {
      errorNode.innerHTML = ''
      controlNode.classList.remove('is-invalid')
    }
    if (!isPasswordConfirmationValid()) {
      errorNode.innerHTML = ''
      controlNode.classList.add('is-invalid')
      return false
    }
  }
  return true
}

const validateForm = (formNode) => {
  const inputs = formNode.querySelectorAll('[data-js-input]')
  const totalInputs = inputs.length
  let validInputs = 0

  inputs.forEach((inputNode) => {
    const isInputValid = validateInput(inputNode)

    if (isInputValid) {
      validInputs++
    }
  })

  return totalInputs === validInputs
}

 formNode.addEventListener('submit', (event) => {
  event.preventDefault()

  const isFormValid = validateForm(formNode)

  if (isFormValid) {
    const formData = new FormData(formNode)
    const formDataObject = Object.fromEntries(formData)
  }
})