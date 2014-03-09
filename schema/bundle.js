var mongoose = require('mongoose');

var BundleSchema = new mongoose.Schema({
    appName: {type: String, default: ''},
    author: {type: String, default: ''},
    bundleName: {type: String, default: ''},
    timestamp: {type: String, default: ''},
    filePath: {type: String, default: ''}
});

exports.model = mongoose.model('Bundle', BundleSchema);