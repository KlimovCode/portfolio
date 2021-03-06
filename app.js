const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.options('*', cors())

var db

if (process.env.NODE_ENV === 'production') {
  app.post('/api', async (req, res) => {
    customer = req.body
    await db.collection('msgs').insertOne(customer, (err, result) => {
      if (err) {
        console.log(err)
        return res.sendStatus(500)
      }
    })
    let msgs = await db.collection('msgs').find().toArray()
    res.status(201).json({ msg: 'All OK!', msgs })
  })

  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

if (process.env.NODE_ENV === 'development') {
  app.post('/api', async (req, res) => {
    customer = req.body
    await db.collection('msgs').insertOne(customer, (err, result) => {
      if (err) {
        console.log(err)
        return res.sendStatus(500)
      }
      // console.log(result)
    })
    let msgs = await db.collection('msgs').find().toArray()
    res.status(201).json({ msg: 'All OK!', msgs })
  })

  app.use('/', express.static(path.join(__dirname, 'client', 'public')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'))
  })
}

MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, (err, client) => {
  if (err) console.log(err)
  db = client.db('portfolio')
  app.listen(5003, () => {
    console.log('Server has started on 5003 port')
  })
})
