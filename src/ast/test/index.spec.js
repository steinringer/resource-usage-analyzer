var expect = require('chai').expect,
    ast = require('../');

describe('ast', () => {
    describe('getLiteralNodeValue', () => {
        it('should return value for LITERAL arg node', () => {
            const code = 'fun("myValue");';
            const argNode = ast.equery('fun(__)', code)[0].arguments[0];
            const value = ast.getLiteralNodeValue(argNode, code);
            expect(value).to.equal('myValue');
        });
    });
});

