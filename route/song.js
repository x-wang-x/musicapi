const router = require('express').Router()
const cheerio = require('cheerio')
const { default: Axios } = require('axios')

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', function (req, res){
    res.send('Hey yo !! This is MusicAPI page')
})

router.get('/album', (req, res,next) => {
   const id = req.query.id
   const baseUrl = `http://api.joox.com/web-fcgi-bin/web_get_albuminfo?lang=id&country=id&albumid=${id}&from_type=null&channel_id=null`
   Axios.request({
     url: baseUrl,
     method: "get",
     headers:{
         Cookie: "wmid=142420656; user_type=1; country=id; session_key=2a5d97d05dc8fe238150184eaf3519ad;"
     }}).then((response)=>{

     	let data=response.data

		console.log(baseUrl)
		console.log(data)
	    res.send(data)

     }).catch(error =>{
        res.send(error)
    })
})

router.get('/singer', (req, res,next) => {
   const id = req.query.id
   const s = req.query.start
   const e = req.query.end
   const baseUrl = `http://api.joox.com/web-fcgi-bin/web_album_singer?cmd=2&singerid=${id}&sin=${s}&ein=${e}&lang=id&country=id&callback=xk3n`
     Axios.request({
     url: baseUrl,
     method: "get",
     headers:{
         Cookie: "wmid=142420656; user_type=1; country=id; session_key=2a5d97d05dc8fe238150184eaf3519ad;"
     }}).then((response)=>{

     	let data=response.data
		data=data.replace('xk3n(','')
		data=data.replace(')','')

		res.setHeader('Content-Type', 'application/json')

	    res.end(data)

     }).catch(error =>{
        res.send(error)
    })
})

router.get('/search',(req,res,next)=>{
	const q = req.query.query
	const p = req.query.pag
	const s = req.query.start
	const e= req.query.end
	const baseUrl= `http://api.joox.com/web-fcgi-bin/web_search?callback=xk3n&lang=id&country=id&type=0&search_input=${q}&pn=${p}&sin=${s}&ein=${e}&_=`
	 Axios.request({
     url: baseUrl,
     method: "get",
     headers:{
         Cookie: "wmid=142420656; user_type=1; country=id; session_key=2a5d97d05dc8fe238150184eaf3519ad;"
     }}).then((response)=>{

	let data=response.data
	data=data.replace('xk3n(','')
	data=data.replace(')','')

	res.setHeader('Content-Type', 'application/json');
    res.end(data)

	}).catch(error =>{
        res.send(error)
    })

})

router.get('/song/:id',(req,res,next)=>{
	const song_id = req.params.id
	const baseUrl = `http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid=${song_id}&lang=id&country=id&from_type=null&channel_id=null`
    Axios.request({
     url: baseUrl,
     method: "get",
     headers:{
         Cookie: "wmid=142420656; user_type=1; country=id; session_key=2a5d97d05dc8fe238150184eaf3519ad;"
     } 
}).then((response)=>{
	let details = []
	let data = response.data
	let title,singer,album,release,cover,r192Url,r320Url,singer_id,msg
	data=data.replace('MusicInfoCallback(','')
	data=data.replace(')','')
	
	res.setHeader('Content-Type', 'application/json');
    res.end(data)

    }).catch(error =>{
        res.send(error)
    })
})

module.exports = router