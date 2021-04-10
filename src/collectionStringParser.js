module.exports = {Parse};

function Parse(db, collectionString)
{
    const splits = collectionString.split("/");
    let ref = db;
    let docStep = false;
    splits.forEach(split => {
        if(docStep)
        {
            ref = ref.doc(split);
        }
        else
        {
            ref = ref.collection(split);
        }
        docStep = !docStep;
    });
    return ref;
}