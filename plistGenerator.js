var fs      = require('fs');

var generator = function (config) {

    var strVar="";
    strVar += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    strVar += "<!DOCTYPE plist PUBLIC \"-\/\/Apple\/\/DTD PLIST 1.0\/\/EN\" \"http:\/\/www.apple.com\/DTDs\/PropertyList-1.0.dtd\">";
    strVar += "<plist version=\"1.0\">";
    strVar += "    <dict> \n";
    strVar += "        <!-- array of downloads. --> \n";
    strVar += "        <key>items<\/key> \n";
    strVar += "        <array> \n";
    strVar += "            <dict> \n";
    strVar += "                <!-- an array of assets to download --> \n";
    strVar += "                <key>assets<\/key> \n";
    strVar += "                <array> \n";
    strVar += "                    <!-- software-package: the ipa to install. --> \n";
    strVar += "                    <dict> \n";
    strVar += "                        <!-- required.  the asset kind. --> \n";
    strVar += "                        <key>kind<\/key> \n";
    strVar += "                        <string>software-package<\/string> \n";
    strVar += "                        <!-- required.  the URL of the file to download. --> \n";
    strVar += "                        <key>url<\/key> \n";
    strVar += "                        <string>http:\/\/192.168.49.85:8030\/packages\/" + config.filePath + "<\/string> \n";
    strVar += "                    <\/dict> \n";
    strVar += "                <\/array><key>metadata<\/key> \n";
    strVar += "                <dict> \n";
    strVar += "                    <!-- required --> \n";
    strVar += "                    <key>bundle-identifier<\/key> \n";
    strVar += "                    <string>" + config.bundleName + "<\/string> \n";
    strVar += "                    <!-- required.  the download kind. --> \n";
    strVar += "                    <key>kind<\/key> \n";
    strVar += "                    <string>software<\/string> \n";
    strVar += "                    <!-- required.  the title to display during the download. --> \n";
    strVar += "                    <key>title<\/key> \n";
    strVar += "                    <string>" + config.appName + "<\/string> \n";
    strVar += "                <\/dict> \n";
    strVar += "            <\/dict> \n";
    strVar += "        <\/array> \n";
    strVar += "    <\/dict> \n";
    strVar += "<\/plist> \n";

    fs.writeFile("packages/" + config.filePath.split(".")[0] + ".plist", strVar, function (err) {
        console.log("Plist created at: " + "packages/" + config.appName + ".plist");
    });
}

module.exports = generator;