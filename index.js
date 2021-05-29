const admin = require("firebase-admin");

const collectionTools = require("./src/collectionTools");
const collectionParser = require("./src/collectionStringParser");

module.exports = {Initialise, MoveCollection, CopyCollection, DeleteCollection, MapCollection, DeleteDocumentsWhere};

let firestore = false;

function Initialise(serviceAccountPath)
{    
    if(firestore === false)
    {
        if(serviceAccountPath === undefined || serviceAccountPath === null)
        {
            serviceAccountPath = "../../serviceaccount.json";
        }
        const serviceAccount = require(serviceAccountPath);
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

    return collectionTools.DeleteCollection(collectionRef);
} 

//Deletes documents where the conditionalFunc returns true.
//conditionalFunc takes id and data. Return true to delete, false to ignore.
function DeleteDocumentsWhere(collection, conditionalFunc)
{
    Initialise();

    const collectionRef = collectionParser.Parse(firestore, collection);

    return collectionTools.DeleteDocumentsWhere(collectionRef, conditionalFunc);
} 

//map function takes in the data and should return an object with bool field 'include'
// to indicate if to update this document and a object field 'data' with the data to 
// pass to the document.update
function MapCollection(collection, mapFunction)
{
    Initialise();

    const collectionRef = collectionParser.Parse(firestore, collection);

    return collectionTools.MapCollection(collectionRef, mapFunction);
}