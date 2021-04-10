module.exports = {CopyCollection, DeleteCollection, MoveCollection};

function CopyCollection(sourceRef, targetRef)
{
    return sourceRef.get()
        .then(qrySnapshot=>{
            const promises = [];
            qrySnapshot.forEach(doc=>{
                const data = doc.data();
                promises.push(targetRef.doc(doc.id).set(data));
            });
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
        });
} 