const { test } = require('@jest/globals');
const Engineer = require('../lib/Engineer');

test('set github username via constructor', () => {
    const github = 'Mbogaert';
    const engineer = new Engineer('Mathew', 999, 'bogaert@email.arizona.edu', 'Mbogaert');
    expect(engineer.github).toBe(github);
});

test('get github via getGithub()', () => {
    const getGithub = 'Mbogaert';
    const engineer= new Engineer('Mathew', 999, 'bogaert@email.arizona.edu', 'Mbogaert');
    expect(engineer.getGithub()).toBe(getGithub);
});
test('return Engineer, override Engineer, via getRole()', () => {
    const engineer = new Engineer('Mathew', 999, 'bogaert@email.arizona.edu', 'Mbogaert');
    expect(engineer.getRole()).toBe('Engineer');
});