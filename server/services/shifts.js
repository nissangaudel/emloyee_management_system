let Shift = require('../model/shift');
let Employee = require('../model/model')

exports.start = (req, res, next) => {
    Employee.find({ employeeID: req.body.employeeid })
        .then(employee => {
            if (employee) {
                let newShift = Shift({
                    "clockIn": new Date(),
                    "employeeID": req.body.employeeid,
                    "isIn": true,
                });
                newShift
                    .save(newShift)
                    .then(data => {
                        res.send({ message: 'You are Sucessfully Clocked In', data: employee[0] });
                    })
                    .catch(err => {
                        res.send(err);
                    })
            } else {
                res.send(`User ${req.body.name} with ID: ${req.body.employeeid} doesn't exist`);
            }
        })
        .catch(err => {
            res.send({ error: err });
        })
}

exports.end = (req, res, next) => {
    let id = req.body.employeeid;

    Shift.findOneAndUpdate({ employeeID: id }, { $currentDate: { clockOut: { $type: "date" } }, isOut: true }, { useFindAndModify: false })
        .then(shift => {
            if (!shift) {
                res.status(500).send({ message: 'Some Interanal Error Occured' });
            } else {
                res.status(200).send({ data: shift, message: "Success" });
            }
        })
        .catch(err => {
            res.send(err);
        })
}