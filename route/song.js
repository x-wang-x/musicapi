const router = require('express').Router()
const cheerio = require('cheerio')
const on404 = require('./handleError').on404
const { default: Axios } = require('axios')

router.get('/id', (req, res,next) => {
   res.send('nothing')
})

router.get('/song/:query',(req,res,next)=>{
	const query = req.params.query
	const baseUrl = `http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid=${query}&lang=id&country=id&from_type=null&channel_id=null`
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
	const obj = JSON.parse(data)
	msg=obj.msg

	if (msg=='invaid songid'){
		msg='Song ID is incorrect !'
		details.push({msg})
		res.json(details)
		console.log(`incorrect song with id ${query}`)
	}
	else {
	album = obj.malbum
	title=obj.msong
	cover=obj.imgSrc
	singer=obj.msinger
	release=obj.public_time
	r192Url=obj.r192Url
	r320Url=obj.r320Url
	singer_id=obj.msingerid

	details.push({msg,title,singer,album,cover,release,singer_id,r192Url,r320Url})
            res.json(details)
    }}).catch(error =>{
        res.send(error)
    })
})

module.exports = router