const router = require('express').Router()

router.get('/', function (req, res){
    res.send('Hey yo !! This is MusicAPI page')
})

const on404 =(req,res) => {
    res.status(404).json({
        song:[]
    })
}

module.exports = {router,on404}