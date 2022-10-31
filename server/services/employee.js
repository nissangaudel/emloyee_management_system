let Employee = require('../model/model');


exports.AddEmployee = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content Cannot Be Empty!" });
        return;
    }
    let newEmployee = Employee({
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "phoneNumber": req.body.phoneNumber,
        "payRate": req.body.payRate,
        "gender": req.body.gender,
        "employeeID": req.body.employeeID,
        "accountNumber": req.body.accountNumber
    });

    newEmployee
        .save(newEmployee)
        .then(data => {

            res.status(201).render('index');
            console.log('New Employee Sucessfully added');
        })
        .catch(err => {
            res.status(500).send({ message: `Error: ${err}` });
        })
}

exports.GetAllEmployee = (req, res) => {
    const id = req.query.employeeID;
    if (id) {
        Employee.find({ employeeID: id })
            .then(employee => {
                if (employee) {
                    res.status(200).send(employee);

                } else {
                    res.status(404).send({ message: `Employee With EmployeeID:${id} cannot be found` });

                }
            })
            .catch(err => {
                res.status(500).send({ message: 'some internal error occured' });
            })
    } else {
        Employee.find({})
            .then(employee => {
                res.send(employee);
            })
            .catch(err => {
                res.status(500).send({ messange: 'internal error occured' });
            })
    }
}

exports.Update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Data to be updated cannot be empty' });
    }

    const id = req.params.id;
    Employee.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(employee => {
            if (!employee) {
                res.status(404).send({ message: `Employee With ID:${id} cannot be found` });
            } else {
                res.send({ data: employee, changed: req.body })
            }
        })
        .catch(err => {
            res.status(500).send({ message: `'Some Error occured while updating employee info ${err}'` });
        })
}


exports.Delete = (req, res) => {
    const id = req.params.id
    Employee.findByIdAndDelete(id)
        .then(employee => {
            if (!employee) {
                res.status(404).send({ message: 'Employee Couldn;t be found' });
            } else {
                res.redirect('/employee_list')
            }
        })
        .catch(err => {
            res.send({ message: 'Some error occured' });
        });
}