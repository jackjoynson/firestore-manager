module.exports = {CopyCollection, DeleteCollection, MoveCollection, MapCollection, DeleteDocumentsWhere};

function CopyCollection(sourceRef, targetRef)
{
    return sourceRef.get()
        .then(qrySnapshot=>{
            const promises = [];
            qrySnapshot.forEach(doc=>{
                const data = doc.data();
                promises.push(targetRef.doc(doc.id).set(data));
            });
            return Promise.all(promises);
        });
} 

function DeleteCollection(collection)
{
    return collection.get()
        .then(qrySnapshot=>{
            const promises = [];
            qrySnapshot.forEach(doc=>{
                promises.push(collection.doc(doc.id).delete());
            });
            return Promise.all(promises);
        });
} 

//conditionalFunc takes id and data. Return true to delete, false to ignore.
function DeleteDocumentsWhere(collection, conditionalFunc)
{
    return collection.get()
        .then(qrySnapshot=>{
            const promises = [];
            qrySnapshot.forEach(doc=>{
                if(conditionalFunc(doc.id, doc.data()))
                {
                    promises.push(collection.doc(doc.id).delete());
                }
            });
            return Promise.all(promises);
        });
} 

function MoveCollection(sourceRef, targetRef)
{
    return sourceRef.get()
        .then(qrySnapshot=>{
            const promises = [];
            qrySnapshot.forEach(doc=>{
                const data = doc.data();
                promises.push(targetRef.doc(doc.id).set(data));
                promises.push(sourceRef.doc(doc.id).delete());
            });
            return Promise.all(promises);
        });
} 

//map function takes in the data and should return an object with include:bool to update this 
//document and data:object with the data to pass to the document.update
function MapCollection(collection, mapFunction)
{
    return collection.get()
        .then(qrySnapshot=>{
            const promises = [];
            qrySnapshot.forEach(doc=>{
                const data = doc.data();
                const mapResult = mapFunction(data);
                if(mapResult.include)
                {
                    promises.push(collection.doc(doc.id).update(mapResult.data));
                }
            });
            return Promise.all(promises);
        });
} 