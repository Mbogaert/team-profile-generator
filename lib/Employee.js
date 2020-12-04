class Employee {
    constructor(name, id) {
       this.name = name;
       this.id = id;
    }
    getName() {
        return this.name;
    }
};

module.exports = Employee;