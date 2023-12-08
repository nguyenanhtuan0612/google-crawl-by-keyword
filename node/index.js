const express = require('express');
const cors = require('cors');
const http = require('http');
const crawl = require('./crawl');
const bodyParser = require('body-parser');
const { dbConnect } = require('./sequelize');

// setup the port our backend app will run on
const PORT = 3000;
const NEW_MESSAGE_EVENT = 'new-message-event';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());

app.post('/addSite', async (req, res) => {
  const data = await crawl.addSite(req.body.site, req.body.username, req.body.password);
  return res.json(data);
});

app.get('/listSite', async (req, res) => {
  const data = await crawl.listSite(req.query.offset);
  return res.json(data);
});

app.put('/updateSite', async (req, res) => {
  const data = await crawl.updateSite(req.body.id, req.body.site, req.body.username, req.body.password);
  return res.json(data);
});

app.delete('/deleteSite', async (req, res) => {
  const data = await crawl.deleteSite(req.query.id);
  return res.json(data);
});

app.post('/addKeyword', async (req, res) => {
  const data = await crawl.addKeyword(req.body.siteId, req.body.keywords);
  return res.json(data);
});

app.delete('/deleteKeyword', async (req, res) => {
  const data = await crawl.deleteKeyword(req.query.id);
  return res.json(data);
});

server.listen(PORT, async () => {
  dbConnect();
  console.log(`listening on *:${PORT}`);
});
