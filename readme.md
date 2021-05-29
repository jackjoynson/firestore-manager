# firestore-manager
A simple set of utilities for managing Firestore.
Wraps the offical firestore-admin package. 
Aimed to be a dev utility used within a local node environment and not for use in production.
Not an official package.

## Setup
Install using 
```sh
    npm install firestore-manager --save
```
[Generate a service account key](https://firebase.google.com/support/guides/service-accounts) and save it in serviceaccount.json in the root folder.
*This file must be kept secure.* 

From v0.0.13 you can call fm.Initalise("path/to/serviceaccount.json") if you wish to use a different path or name for the service account. 

## Usage

### Import into project
const fm = require("firestore-manager");

### Call functions with the paths specified using forward slash separators

#### Move all documents from one collection to another
fm.MoveCollection("mycollection/mydocument/mysubcollection","mycollection/mydocument/mynewcollection");

#### Copy all documents from one collection to another
fm.CopyCollection("oldcollection","newcollection");

#### Delete all documents from a collection
fm.DeleteCollection("collectionToDelete");

#### Conditionally delete documents from a collection
fm.DeleteDocumentsWhere("collection", conditionalFunction); 
    > conditional function takes in the document id and data. It should return true to delete, false to ignore.

#### Transform document data in a collection
fm.MapCollection("collectionToMap", mapFunction); 
    > map function takes in the data and should return an object with:
        - bool field 'include' to indicate if this document should be updated.
        - object field 'data' with the data to pass to the document.update.

## Notes
Functions return promises. 
Not designed for large batch operations.

## License
MIT License