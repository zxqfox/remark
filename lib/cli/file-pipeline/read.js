/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer. All rights reserved.
 * @module file-pipeline/read
 * @fileoverview Read a file if not already filled.
 */

'use strict';

/*
 * Dependencies.
 */

var fs = require('fs');
var debug = require('debug')('mdast:file-pipeline:read');

/*
 * Methods.
 */

var readFile = fs.readFile;

/*
 * Constants.
 */

var ENCODING = 'utf-8';

/**
 * Fill a file with its contents when not already filled.
 *
 * @example
 *   var file = new File({
 *     'directory': '~',
 *     'filename': 'example',
 *     'extension': 'md'
 *   });
 *
 *   read({'file': file}, console.log);
 *
 * @param {Object} context
 * @param {function(Error?)} done
 */
function read(context, done) {
    var file = context.file;
    var filePath = file.filePath();

    if (file.contents) {
        done();
    } else {
        debug('Reading `%s` in `%s`', filePath, ENCODING);

        readFile(filePath, ENCODING, function (err, contents) {
            file.contents = contents || '';

            done(err);
        });
    }
}

/*
 * Expose.
 */

module.exports = read;