let Shift = require('../model/shift');
let Employee = require('../model/model')
let axios = require('axios');
const { response } = require('express');
exports.start = (req, res, next) => {
    const id = req.body.employeeid;
    const name = req.body.name;

    verifyEmployee(id, name)
        .then(employee => {
            checkShift(id)
                .then(shift => {
                    if (shift.isIn === false && employee.verified === true) {
                        let newShift = Shift({
                            "clockIn": new Date(),
                            "employeeID": req.body.employeeid,
                            "isIn": true,
                        });
                        newShift
                            .save(newShift)
                            .then(data => {
                                res.send({ message: 'You are successfully Clocked In', data: data });
                            })
                            .catch(err => {
                                res.send(err);
                            })
                    } else {
                        res.send({ Message: `${employee.message} , ${shift.message}` });
                    }
                })
                .catch(err => {
                    res.send(err)
                })

        })
        .catch(err => {
            console.log({ error: err });
        })
}

exports.end = (req, res, next) => {
    const id = req.body.employeeid;
    const name = req.body.name;
    verifyEmployee(id, name)
        .then(employee => {
            checkShift(id)
                .then(shift => {
                    if (employee.verified === true && shift.isIn === true) {
                        Shift.findOneAndUpdate({ employeeID: id }, { $currentDate: { clockOut: { $type: "date" } }, isOut: true }, { useFindAndModify: false })
                            .then(shift => {
                                if (!shift) {
                                    res.status(500).send({ message: 'Some Interanal Error Occured' });
                                } else {
                                    res.send('you are sucessfully clocked out')
                                }
                            })
                            .catch(err => {
                                res.send(err);
                            })
                    } else {
                        res.send({ Message: `${employee.message} , ${shift.message}` });
                    }
                })
                .catch(err => {
                    res.send(err);
                })
        })
        .catch(err => {
            res.send(err);
        })
}


async function checkShift(employeeID) {
    try {
        let response = await Shift.find({ employeeID: employeeID });
        if (!response[0]) {
            return {
                isIn: false, message: `Shift Doesn't exist with ID : ${employeeID}`
            }
        } else {
            console.log(response);
            return {
                isIn: true, message: `Shift Already exists with ID : ${employeeID}`
            };
        }
    }
    catch (err) {
        return { isIn: true, message: err };
    }
}



async function verifyEmployee(employeeID, name) {

    try {
        let response = await axios.get(`http://localhost:3000/get_employee/?employeeID=${employeeID}`);
        if (response.data[0].firstName === name) {
            return { verified: true, message: 'Employee Verified' };

        }
    } catch (err) {
        if (!response.data) {
            return { verified: false, message: `Employee ${name} with ID: ${employeeID} doesn't exist` }
        }
        return { verified: false, message: response }
    }
}