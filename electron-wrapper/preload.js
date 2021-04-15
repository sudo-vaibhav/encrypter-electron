const fs = require('fs')

const { exec } = require('child_process')

window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#form')
  const spinnerContainer = document.querySelector('.spinner-container')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    spinnerContainer.style.display = 'grid'
    const fileName = form['fileName'].value
    const key = form['key'].value
    const fileType = fileName.split('.')[1]

    exec(
      `${__dirname}/AESCipher ${__dirname + '/' + fileName} ${key}`,
      (error, stdout, stderr) => {
        spinnerContainer.style.display = 'none'
        // console.log(stdout, error, stderr)
        const [encrypted, decrypted] = stdout.split('\n')
        fs.writeFileSync(
          '/Users/vaibhavchopra/Desktop/encrypted.' + fileType,
          encrypted,
        )
        fs.writeFileSync(
          '/Users/vaibhavchopra/Desktop/decrypted.' + fileType,
          decrypted,
        )

        document.querySelector('form').insertAdjacentHTML(
          'beforeend',
          `
          <div class="form-group">
            <small>
              encrypted:
            </small>
            <br/>
            ${encrypted}
          </div>
          <div class="form-group">
          <small>
          decrypted / original:
          </small>
          <br/>
            ${decrypted}
          </div>
          `,
        )
      },
    )
  })
})