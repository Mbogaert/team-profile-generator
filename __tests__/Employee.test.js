const { test, expect } = require('@jest/globals');
const Employee = require('../lib/Employee');

test('create employee object', () => {
    const employee = new Employee();

    expect(typeof(employee)).toBe("object");
});

test('set name via constructor', () => {
    const name = 'Mathew';
    const employee = new Employee(name);
    expect(employee.name).toBe(name);
});

test('set id via constructor', () => {
    const id = 100;
    const employee = new Employee('Mathew', 100);
    expect(employee.id).toBe(id);
});

test('get name using getName()', () => {
    const getName = 'Mathew';
    const employee = new Employee(getName);
    expect(employee.getName()).toBe(getName);
})