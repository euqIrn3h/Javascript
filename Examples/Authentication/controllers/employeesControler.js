const data = {};
data.employees = require('../models/data.json');

const get = (req, res) => {
    res.json(data.employees);
};

const getById = (req,res) => {
    let employee = data.employees.find( (employee) =>  employee.id === Number(req.params.id) );
    if(!employee){
        res.status(400).json({ "message": `Employee Id ${req.body.id} not found !`});
    }
    res.status(200).json(employee);
};

const create = (req,res) => {
    if(!req.body.firstname){
        res.status(400).json({ "message": "First name are required !!"});
    }
    let newEmployee = {
        "id": data.employees[data.employees.length-1].id + 1,
        "firstname": req.body.firstname
    };
    data.employees.push(newEmployee);
    res.status(201).json(newEmployee);
};

const update = (req,res) => {
    if(!req.body.firstname){
        res.status(400).json({ "message": "First nameare required !!"});
    }

    let employee = data.employees.find( (employee) =>  employee.id === Number(req.body.id) );

    if(!employee){
        res.status(400).json({ "message": `Employee Id ${req.body.id} not found !`});
    }

    data.employees.forEach( (element) => {
        if(element.id === Number(req.body.id)){
            element.firstname = req.body.firstname;
            employee = element;
        }
    });

    res.json(employee);
};

const remove = (req,res) => {
    let employee = data.employees.find( (employee) => employee.id === Number(req.body.id) );
    if(!employee){
        res.status(400).json({ "message": `Employee Id ${req.body.id} not found !`});
    }

    data.employees.splice(data.employees.indexOf(employee),1);
    res.status(200).json({ "message": `Employee Id ${req.body.id} deleted !`});
};

module.exports = { get, getById, create, update, remove};