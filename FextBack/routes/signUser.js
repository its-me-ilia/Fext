const express = require('express');
const router = express.Router();
const request = require('request-promise');
const {User} = require('../db').models;

router.post('/', async (req,res)=>{
    const accessToken = req.body.accessToken;
    console.log(accessToken)
    if(!accessToken || accessToken.trim().length < 1){
        return res.status(409).send({
            message: 'მისაწვდომი შაბლონი ვერ მოიძებნა'
        });
    };
    const userObj = await request({uri: `https://graph.facebook.com/me?fields=id&access_token=${accessToken}`, json: true});
    console.log(userObj, typeof userObj)
    const userId = userObj.id;
    console.log(userId);
    if(!userId){
        return res.status(409).send({
            message: 'მომხმარებლის აიდი ვერ მოიძებნა'
        });
    };
    let user;
    user = await User.findOne({fbId: userId});
    if(user){
        console.log('user exits');
        return res.status(200).send({
            success: true
        });
    };
    user = await User.create({fbId: userId});
    console.log(user);
    return res.status(200).send({
        success: true
    });
});

module.exports = router;