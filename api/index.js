const bodyParser = require('body-parser')
var multer = require('multer')
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    console.log("processing filename")
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.filename}-${Date.now()}.${ext}`);
  },
});


var upload = multer({ storage: multerStorage })
const app = require('express')()
app.use(require('cors')())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

let encrypted = ''
let decrypted = ''

app.post('/files', upload.array("collection",5),(req, res) => {
  console.log(req.files)
  return res.json({
    status: 'ok',
    files : req.files
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
