'use strict';

const fs = require('fs-extra'),
    co = require('co'),
    _ = require('lodash'),
    globAll = require('./glob-all'),
    ast = require('./ast')
    ;

const defaultSettings = {
    fileGlobs: [
        '**/*.js'
    ],
    ignoreGlobs: [
        '**/*.test.js',
        '**/*.spec.js',
        '**/*.mock.js',
        // '**/Scripts/**',
        '**/node_modules/**',
        '**/localizationProviderTemplate.js',
        '**/packageDataProviderTemplate.js',
    ],
};

let getAllResourcesInFile = co.wrap(function* (fileName) {
    let errors = [];
    try {
        let code = yield fs.readFile(fileName, 'utf-8');

        let nodes = ast.equery('localization.get($name)', code);

        let resources = _.chain(nodes)
            .map(node => {
                try {
                    return ast.getLiteralNodeValue(node._named.name, code);
                } catch (err) {
                    errors.push({
                        fileName,
                        err
                    });
                }
            })
            .compact()
            .uniq()
            .value();

        return {
            resources,
            errors
        };
    }
    catch (err) {
        errors.push({
            fileName,
            err
        });
        return {
            errors
        };
    }
});

let getAllResources = co.wrap(function* ({ rootDir, fileGlobs = defaultSettings.fileGlobs, ignoreGlobs = defaultSettings.ignoreGlobs, }) {
    let srcFiles = yield globAll(rootDir, fileGlobs, ignoreGlobs);
    let resourcesInFiles = yield srcFiles.map(getAllResourcesInFile);

    resourcesInFiles = _.flatten(resourcesInFiles);

    let resources = _.chain(resourcesInFiles)
        .map(r => r.resources)
        .flatten()
        .compact()
        .uniq()
        .value();

    let errors = _.chain(resourcesInFiles)
        .map(r => r.errors)
        .flatten()
        .compact()
        .uniq()
        .value();

    return {
        resources,
        errors
    };
});

module.exports = getAllResources;

// const rootDir = 'c:/_dev/Portego.Calculations/Portego.Calculations.Web/App/Packages/Calculations/';

// getAllResources({ rootDir })
//     .then(({
//         resources,
//         errors
//     }) => {
//         console.log(resources);
//         console.error(errors);
//     });