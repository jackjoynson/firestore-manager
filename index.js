const admin = require("firebase-admin");

const collectionTools = require("./src/collectionTools");
const collectionParser = require("./src/collectionStringParser");

module.exports = {Initialise, MoveCollection, CopyCollection, DeleteCollection};

let firestore = false;

function Initialise()
{    
    if(firestore === false)
    {
        const serviceAccount = require("../../serviceaccount.json");
        admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
        firestore = admin.firestore();
    }
}

function MoveCollection(sourceCollection, targetCollection)
{
    Initialise();

    const sourceRef = collectionParser.Parse(firestore, sourceCollection);
    const targetRef = collectionParser.Parse(firestore, targetCollection);

    return collectionTools.MoveCollection(sourceRef, targetRef);
} 

function CopyCollection(sourceCollection, targetCollection)
{
    Initialise();

    const sourceRef = collectionParser.Parse(firestore, sourceCollection);
    const targetRef = collectionParser.Parse(firestore, targetCollection);

    return collectionTools.CopyCollection(sourceRef, targetRef);
} 

function DeleteCollection(collection)
{
    Initialise();

    const collectionRef = collectionParser.Parse(firestore, collection);

    return collectionTools.CopyCollection(collectionRef);
} 