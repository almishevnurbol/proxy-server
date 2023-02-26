const express = require('express')
const axios = require('axios')
const FormData = require('form-data')
const path = require('path')
const app = express()
fs = require('fs')
const fileUpload = require('express-fileupload')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(fileUpload())

const port = 5000

app.get('/', async (req, res) => {
    try {
        const form = new FormData()
        const fileName = await axios.get(`https://marketplacedeposit.com/api/images/${req.query.fileName}`, { responseType: 'stream' })
        console.log(`https://marketplacedeposit.com/api/images/${req.query.fileName}`)
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

app.post('/aliexpress', async (req, res) => {
    try {
        const response = await axios.get('https://aliexitem.com/asp?productId=EkaazEyLXLWliupiZT7t0UlXqUCwA4aWIF8cF0xO64fpGCzawAcyHL4ogGH3yhmmWKUBBwQkDFUVHfdsqpEDqfSMlUZgDTk3KxV1I41Wah5PnIx2wV%2Fu00GlkEHHhoFk5HhI2APCTGUtEuthVnsP76v%2BB41wzFEJvK8ZU6ja2llpDz4eJ227YPYUySTpXNNBh9wEZzOOlTTgn2D7%2FeVbYhMunNQ0LGnjHpdT68y6%2BLw%3D')

        res.html(response.data)
    } catch (error) {
        res.json(error)
    }
})

app.get('/l688', async (req, res) => {
    try {
        const id = req.query.id
        const response = await axios.get(`https://t-b.ru.com/catalog/1688/product/${id}/#`)
        
        res.html(response.data)
    } catch (error) {
        res.json(error)
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app