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

## Usage

### Import into project
const fm = require("firestore-manager");

### Call functions with the paths specified using forward slash separators
fm.MoveCollection("mycollection/mydocument/mysubcollection","mycollection/mydocument/mynewcollection");
fm.CopyCollection("oldcollection","newcollection");
fm.DeleteCollection("collectionToDelete");

## Notes
Functions return promises. 
Not designed for large batch operations.

## License
MIT License