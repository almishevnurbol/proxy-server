const app = require('express')();

app.get('/api/l688', async (req, res) => {
  try {
      const id = req.query.id
      const response = await axios.get(`https://t-b.ru.com/catalog/1688/product/${id}/#`)

      res.html(response.data)
  } catch (error) {
      res.json(error)
  }
})