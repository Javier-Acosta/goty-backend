import * as functions from "firebase-functions";
import * as admin   from 'firebase-admin';

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