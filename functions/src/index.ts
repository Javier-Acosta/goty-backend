
import * as functions from "firebase-functions";
import * as admin   from 'firebase-admin';

import * as express from 'express';
import * as cors from 'cors';

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  const db=admin.firestore();
// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.json({
    mensaje:'Hola Mundo function desde Firebase'
});
});


export const getGOTY = functions.https.onRequest(async(request, response) => {
    // const nombre= 'javier';
    // response.json({
    //   nombre
    // })
    const gotyRef =db.collection('goty');
    const docsSnap= await gotyRef.get();
    const votos= docsSnap.docs.map(doc => doc.data());
    response.json (votos);
});

//express
const app = express ();
app.use(cors({origin:true}));

app.get('/goty',async(req,res)=>{

  const gotyRef =db.collection('goty');
  const docsSnap= await gotyRef.get();
  const votos= docsSnap.docs.map(doc => doc.data());
  res.json (votos);

});

app.post('/goty/:id',async(req,res)=>{
  const id= req.params.id;
  const votoRef= db.collection('goty').doc(id);
  const votoSnap= await votoRef.get ();

  if (!votoSnap.exists){
    res.status(400).json({
      ok:false,
      mensaje: 'No existe votos al ID ' + id
    });
  } else{
    // res.json ('El Voto existe')
    const antes= votoSnap.data () || {votos:0};
    await votoRef.update({
      votos: antes.votos + 1

    });
    res.json ({
      ok:true,
      mensaje: `Gracias por tu voto a ${antes.name}`
    });
  }
});

// exports.api=functions.https.onRequest(app);
export const api=functions.https.onRequest(app);