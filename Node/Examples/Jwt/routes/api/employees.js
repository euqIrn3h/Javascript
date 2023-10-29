const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employeesControler');
const verifyJWT = require('../../middlewares/verifyJwt');

router.route('/')
    .get(verifyJWT, employeeController.get)
    .post(employeeController.create)
    .put(employeeController.update)
    .delete(employeeController.remove);

router.route('/:id')
    .get(employeeController.getById);

module.exports = router;
