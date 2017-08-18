const path = require('path'),
    co = require('co'),
    _ = require('lodash'),
    glob = require('glob-promise');

module.exports = co.wrap(function* (rootDir, patterns, ignore) {
    let files = yield patterns.map(p => glob(path.join(rootDir, p), {
        ignore
    }));

    return _.chain(files)
        .flatten()
        .uniq()
        .value();
});