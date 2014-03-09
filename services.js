var appBundle		= require('./services/appBundle');

// var services = function (server) {
// 	server.post('/fileUpload', appBundle.upload);
//     server.get('/appList', appBundle.list);
//     server.post('/appSubmit', appBundle.appSubmit);
// }

var services = function (server) {
    
    // send list of all bundles
    server.get('/bundles', appBundle.listBundles);

    // send single bundle's info
    server.get('/bundles/:id', appBundle.listBundleWithID);

    // save uploaded bundle info
    server.post('/bundles', appBundle.saveBundleInfo);

    // save uploaded .ipa file
    server.post('/bundles/file', appBundle.saveFile);

    // delete a particular bundle from db
    server.delete('/bundles/:id/:code', appBundle.deleteBundle);

}

module.exports = services;