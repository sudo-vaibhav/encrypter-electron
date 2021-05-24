const bodyParser = require('body-parser')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const fs = require('fs')
const app = require('express')()
app.use(require('cors')())
app.use(bodyParser.json())

let encrypted = ''
let decrypted = ''

app.post('/files', upload.array("files",5),(req, res) => {
  encrypted = req.body.encrypted
  decrypted = req.body.decrypted

  fs.writeFileSync('encrypted.txt', encrypted)
  fs.writeFileSync('decrypted.txt', decrypted)

  return res.json({
    status: 'ok',
  })
})



app.get('/encrypted', (req, res) => {
  return res.json({
    encrypted,
  })
})

app.get('/decrypted', (req, res) => {
  return res.json({
    decrypted,
  })
})

app.listen(process.env.PORT || 8000)
