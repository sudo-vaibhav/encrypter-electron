const express = require("express");
const app = express()
app.use(express.static("uploads"))


const crypto = require("crypto");
const fs = require("fs")

const bodyParser = require('body-parser')
var multer = require('multer')

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const extStartIndex = file.originalname.lastIndexOf(".")
    cb(null, `${file.originalname.substr(0,extStartIndex)}-${Date.now()}${file.originalname.substr(extStartIndex)}`);
  },
});


var upload = multer({ storage: multerStorage })


app.use(require('cors')())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const iv = crypto.randomBytes(16)


app.post('/files', upload.array("collection",5),async (req, res) => {
  console.log("req body",req.body)
  var key = req.body.key || '14189dc35ae35e75ff31d7502e245cd9bc7803838fbfd5c773cdcd79b8a28bbd';
  var cipher = crypto.createCipher('aes-256-cbc', key);
    // , iv);
  const encryptionPromises = req.files.map(file => {
    return new Promise(resolve => {
      console.log("fileData:", file)
      const input = fs.createReadStream(file.path)
      const output = fs.createWriteStream(file.path + ".enc")
      
      input.pipe(cipher).pipe(output)
      output.on("finish", () => {
        resolve()
      })
    })
  })

  await Promise.all(encryptionPromises)

  return res.json({
    status: 'ok',
    files : req.files
  })
})


app.listen(process.env.PORT || 8000)
