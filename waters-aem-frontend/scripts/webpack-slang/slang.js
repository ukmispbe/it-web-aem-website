const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const request = require('request');
const logger = console;

// Colors
const errorbold = chalk.bold.red;
const error = chalk.bold.red;
const allgoodbold = chalk.bold.green;
const cyan = chalk.cyan;

// options constants
let HOST;
let PORT;
let USER;
let PASS;

function setOptions({
    host = 'localhost',
    port = 4502,
    username = 'admin',
    password = 'admin',
} = {}) {
    HOST = host;
    PORT = port;
    USER = username;
    PASS = password;

    return true;
}

function init(options = {}) {
    return setOptions(options);
}

function up(file, pathOverride, noResolve, nameChange=null) {
    if (!HOST) {
        setOptions();
    }

    if (!file) {
        return new Error('no file passed');
    }

    const localPath = file;

    let sendTo = undefined;

    // if jcr_root is in file system path, remove before setting destination
    if (noResolve && pathOverride) {
        const fileName = path.basename(file);
        sendTo = pathOverride + fileName;
    } else if (pathOverride && nameChange) {
        sendTo = path.resolve(pathOverride, nameChange);
    } else if (pathOverride) {
        const fileName = path.basename(file);
        sendTo = path.resolve(pathOverride, fileName);
    } else if (path.dirname(file).indexOf('jcr_root') !== -1) {
        sendTo = file.substring(path.dirname(file).indexOf('jcr_root') + 9);
    }

    // create full URL for curl path
    const URL =
        'http://' +
        USER +
        ':' +
        PASS +
        '@' +
        HOST +
        ':' +
        PORT +
        '/' +
        path.dirname(sendTo) +
        '.json';
    logger.log(URL);
    const requestOptions = {
        url: URL,
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    };

    var req = new Promise(function(resolve, reject) {
        function optionalCallback(err, httpResponse, responseBody) {
            if (err) {
                logger.error(errorbold('File Upload Failed'));
                reject(err);
            }

            try {
                var response = JSON.parse(responseBody);

                var status = response['status.code']
                    ? response['status.code']
                    : 201;
                var message = response['status.message']
                    ? response['status.message']
                    : 'File Created';
                var location = response['location']
                    ? response['location']
                    : sendTo;

                if (status === 200 || status === 201) {
                    logger.log(
                        allgoodbold('File Upload Successful on port ') +
                            cyan(PORT + ' : ' + status + ' - ' + message)
                    );
                    logger.log(allgoodbold('Uploaded to: ') + cyan(location));
                    resolve(status, message, location);
                } else {
                    logger.error(
                        errorbold('File Upload Failed: ') +
                            error(status + ' - ' + message)
                    );
                    reject(status, message);
                }
            } catch (err) {
                logger.error(
                    errorbold(
                        'File Upload Failed - Check Username and Password'
                    )
                );
                reject(err);
            }
        }

        var r = request(requestOptions, optionalCallback).auth(USER, PASS);

        var form = r.form();

        form.append('*', fs.createReadStream(localPath));
        form.append('@TypeHint', 'nt:file');
    });

    return req;
}

module.exports = {
    setOptions,
    up,
};
