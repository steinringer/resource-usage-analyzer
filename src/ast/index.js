'use strict';

const grasp = require('grasp'),
    astNodeType = require('./node-type');

const equery = grasp.search('equery');
const squery = grasp.search('squery');

/**
 * returns value for literal node or undefined
 */
function getLiteralNodeValue(argNode) {
    if(argNode.type === astNodeType.LITERAL){
        return argNode.value;
    }
}

module.exports = { 
    squery,
    equery,
    getLiteralNodeValue
};