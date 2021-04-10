import * as admin from "firebase-admin";

const collectionTools = require("./src/collectionTools");
const collectionParser = require("./collectionStringParser");

let firestore = false;

export function Initialise()
{    
    if(firestore === false)
    {
        const serviceAccount = require("serviceaccount.json");
        admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
        firestore = admin.firestore();
    }
}

export function MoveCollection(firestore, sourceCollection, targetCollection)
{
    Initialise();

    const sourceRef = collectionParser.Parse(firestore, sourceCollection);
    const targetRef = collectionParser.Parse(firestore, targetCollection);

    return collectionTools.MoveCollection(sourceRef, targetRef);
} 