const express = require('express');
const song = require('./route/song')
const app = express();
const cors = require('cors')
const helmet = require('helmet')
 
app.use(cors())
app.use(helmet())
app.use('/api',require('./route/handleError').router,song)

app.use(express.static('./public'))
app.listen(8000, () => {
  console.log('Server is running at port 8000');
  
});