# goty-backend

//express
const app = express ();
app.use(cors({origin:true}));

app.get('/goty',async(req,res)=>{

  const gotyRef =db.collection('goty');
  const docsSnap= await gotyRef.get();
  const votos= docsSnap.docs.map(doc => doc.data());
  res.json (votos);

});



exports.api=functions.https.onRequest(app);

import * as express from 'express';
import * as cors from 'cors';
