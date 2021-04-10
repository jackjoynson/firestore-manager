module.exports = {Parse};

function Parse(db, collectionString)
{
    const lasthCarPos = collectionString.length - 1;
    if (collectionString.charAt(0) === "/") collectionString = collectionString.substr(1);
    if (collectionString.charAt(lasthCarPos) === "/") collectionString = collectionString.substr(0, lasthCarPos);

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