const functions = require("firebase-functions");
const admin = require('firebase-admin');
const region = 'asia-south1';
const cors = require('cors')({ origin: true });
const functions_reg = functions.region(region);
const db = admin.firestore();
const db_ref_u = db.collection('users');

function checkEmail(email) {
    let pattern = /^([a-z]{2}[0-9]{3}@snu.edu.in)|([a-z]{1,20}[.][a-z0-9]{1,20}@snu.edu.in)$/;
    return email.match(pattern);
}
function checkContact(contact) {
    let pattern = /^([1-9]{1}[0-9]{9})$/;
    return contact.match(pattern);
}

exports.fetchUser = functions_reg.https.onRequest(async (req, res) =>{
    cors(req, res, async () => {

    const email = req.query.email;
    if(!email){
        res.status(400).json({"status":0,"msg":"required query param: email"});
        return;
    }
    try{
        const queryResult = await db_ref_u.where("email","==",email).get();
        if(queryResult.size == 0){
            res.status(200).json({"status":0,"msg":"user not exist try signup"});
            return;
        }
        let user = queryResult.docs[0].data();
        res.status(200).json({"status":1,"msg":"success","user":user});

    }catch(e){
        res.status(200).json({"status":0,"msg":"Internal error"});
    }
});
});

exports.login = functions_reg.https.onRequest(async (req,res)=>{
    cors(req, res, async () => {

    const user = req.body.user;
    if((user && (!user.name || !user.email || !user.uid)) || !user){
        res.status(400).json({"status":0,"msg":"Bad request. Required body: name, email, uid"});
        return;
    }
    if(!checkEmail(user.email)){
        res.status(400).json({"status":0,"msg":"Enter valid email Ex-ab123@snu.edu.in or keshav.khj@snu.edu.in"});
        return;
    }
    try{
        const q = await db_ref_u.doc(user.uid).get();
        if(q.data()){
            let userObj = {
                last_login:user.last_login,
            };
        }else{
            if(!checkContact(user.contact)){
                delete user.contact;
            }
            let userObj = user;
        }
        await db_ref_u.doc(user.uid).set(userObj);
        res.status(200).json({"status":1,"msg":"user registered successfully"});
    }catch(e){
        functions.logger.error(e);
        res.status(500).json({"status":0,"msg":"internal error registrting user"});
    }
});
})
