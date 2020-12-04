const Manager = require('../lib/Manager');

test('set officeNumber via constructor', () => {
    const officeNumber = 11111;
    const manager = new Manager('Mathew', 999, 'bogaert@email.arizona.edu', 11111);
    expect(manager.officeNumber).toBe(officeNumber);
});

test('get office number via getOfficeNumber())', () => {
    const getOfficeNumber = 11111;
    const manager = new Manager('Mathew', 999, 'bogaert@email.arizona.edu', 11111);
    expect(manager.getOfficeNumber()).toBe(getOfficeNumber);
});
test('return Manager, override Employee, via getRole()', () => {
    const manager = new Manager('Mathew', 999, 'bogaert@email.arizona.edu', 11111);
    expect(manager.getRole()).toBe('Manager');
});