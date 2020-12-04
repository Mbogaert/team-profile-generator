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
    const id = 999;
    const employee = new Employee('Mathew', 999);
    expect(employee.id).toBe(id);
});

test('set email via constructor', () => {
    const email = 'bogaert@email.arizona.edu';
    const employee = new Employee('Mathew', 999, 'bogaert@email.arizona.edu');
    expect(employee.email).toBe(email);
});

test('get name using getName()', () => {
    const getName = 'Mathew';
    const employee = new Employee('Mathew');
    expect(employee.getName()).toBe(getName);
});

test('get id using getId()', () => {
    const getId = 999;
    const employee = new Employee('Mathew', 999);
    expect(employee.getId()).toBe(getId);
});

test('get email via getEmail()', () => {
    const getEmail = 'bogaert@email.arizona.edu';
    const employee = new Employee('Mathew', 999, 'bogaert@email.arizona.edu');
    expect(employee.getEmail()).toBe(getEmail);
});