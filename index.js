const express = require('express')
const axios = require('axios')
const FormData = require('form-data')
const path = require('path')
const app = express()
fs = require('fs')
const fileUpload = require('express-fileupload')

app.use(express.json())
app.use(fileUpload())

const port = 5000

app.get('/', async (req, res) => {
    try {
        const form = new FormData()
        const fileName = await axios.get(`https://marketplacedeposit.com/api/images/${req.query.fileName}`, { responseType: 'stream' })

        if (!fileName.data) {
            return res.status(400).send('No files were uploaded.')
        }

        form.append('image', fileName.data)
        const response = await axios.post('https://api-dbh1-alitools.com/v4/search/image', form)
        // fs.unlink(__dirname + '/static/' + file.name)
        res.json(response.data)
    } catch (error) {
        res.json(error)
    }
})

app.post('/upload', (req, res) => {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.')
    }

    const file = req.files.myFile
    const path = __dirname + '/static/' + file.name

    file.mv(path, (err) => {
        if (err) {
            return res.status(500).send(err)
        }
        return res.send({ status: 'success', name: file.name })
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app