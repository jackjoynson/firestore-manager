export function CopyCollection(sourceRef, targetRef)
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

export function DeleteCollection(collection)
{
    return collection.get()
        .then(qrySnapshot=>{
            const promises = [];
            qrySnapshot.forEach(doc=>{
                promises.push(collection.doc(doc.id).delete());
            });
        });
} 

export function MoveCollection(sourceRef, targetRef)
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