const Intern = require('../lib/Intern');

test('set school via constructor', () => {
    const school = 'UArizona';
    const intern = new Intern('Mathew', 999, 'bogaert@email.arizona.edu', 'UArizona');
    expect(intern.school).toBe(school);
});

test('get school via getSchool())', () => {
    const getSchool = 'UArizona';
    const intern = new Intern('Mathew', 999, 'bogaert@email.arizona.edu', 'UArizona');
    expect(intern.getSchool()).toBe(getSchool);
});
test('return Intern, override Employee, via getRole()', () => {
    const intern = new Intern('Mathew', 999, 'bogaert@email.arizona.edu', 'UArizona');
    expect(intern.getRole()).toBe('Intern');
});