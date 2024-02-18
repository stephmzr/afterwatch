const post = (path: string, params: any, resource_name = 'user') => {
  // The rest of this code assumes you are not using a library.
  // It can be made less verbose if you use one.
  const form = document.createElement('form')
  form.method = 'post'
  form.action = path

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input')
      hiddenField.type = 'hidden'
      hiddenField.name = `${resource_name}[${key}]`
      hiddenField.value = params[key]

      form.appendChild(hiddenField)
    }
  }

  const authField = document.createElement('input')
  authField.type = 'hidden'
  authField.name = 'authenticity_token'
  form.appendChild(authField)

  document.body.appendChild(form)
  form.submit()
}

export const httpDelete = (path: string) => {
  // The rest of this code assumes you are not using a library.
  // It can be made less verbose if you use one.
  const form = document.createElement('form')
  form.method = 'delete'
  form.action = path

  const authField = document.createElement('input')
  authField.type = 'hidden'
  authField.name = 'authenticity_token'
  form.appendChild(authField)

  document.body.appendChild(form)
  form.submit()
}

export default post
