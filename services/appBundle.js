var fs = require('fs'),
    plistGenerator = require('../plistGenerator'),
    Bundle  = require('../schema/bundle').model,
    _ = require('underscore');

// TODO
// GoogleURL = require('google-url');
// googleUrl = new GoogleURL( { key: 'AIzaSyC_nquiYGVZ3ZDbHaobIE5qIsAT3MpthNs' });

var appBundle = {

    listBundles: function (req, res) {
        //  send back list of all bundles
        var bundle = Bundle.find({}, function (err, bundles) {
            res.send(200, bundles);
        });
    },

    listBundleWithID : function (req, res) {
        console.log(req.params);
        Bundle.find({_id: req.params.id}, function (err, bundle) {
            res.send(200, bundle);
        });
    },

    saveFile: function (req, res) {
        fs.readFile(req.files.file.path, function (err, data) {
            var filePath = "packages/" + req.files.file.name;
            fs.writeFile(filePath, data, function (err) {
                console.log("New file has been written at " + filePath);
                res.send(200, "file upload sucessfull");
            });
        });
    },

    saveBundleInfo: function (req, res) {
        console.log("at save bundle info");
        Bundle.create({
            appName: req.body.appName,
            author: req.body.author,
            bundleName: req.body.bundle,
            timestamp: new Date().getTime(),
            filePath: "packages/" + req.body.fileName,
            plistPath: "packages/" + req.body.fileName.split(".")[0]
        }, function(err) {
            console.log("App submitted successfully");
            res.send(200, "App submitted successfully");

            // TODO : implement url shortener
            // googleUrl.shorten( 'http://path/to/bundle`', function( err, shortUrl ) {});
        });

        var plistConfig = {
            appName: req.body.appName,
            bundleName: req.body.bundle,
            filePath: req.body.fileName
        };

        plistGenerator(plistConfig);
    },

    deleteBundle: function (req, res) {
        if (req.params.code == "8080") {
            Bundle.remove({_id: req.params.id}, function(err) {
                console.log("Bundle with ID: %s has been removed", req.params.id);
                res.send(200, "Bundle has been deleted successfully");
            });
        } else {
            res.send(403, "Wrong authentication code");
        }
    }

};

module.exports = appBundle;