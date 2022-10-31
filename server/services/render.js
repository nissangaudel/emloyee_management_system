const Employee = require('../model/model');
const axios = require('axios');


exports.HomeRoute = (req, res) => {
    res.render('index');
};

exports.LoginRoute = (req, res) => {
    let type = req.params.type;
    if (type === "clockin" || type === "clockout") {
        res.render('login_page', { type: type == "clockin" ? "Clock In" : "Clock Out" });
    } else {
        res.status(404);
    }
};

exports.AdminHomeRoute = (req, res) => {
    res.render('admin_home')
};

exports.DisplayNewEmployeeForm = (req, res) => {
    res.render('new_employee_form');
}

exports.DisplayUpdatePage = (req, res) => {
    axios.get(`http://localhost:3000/get_employee/?employeeID=${req.query.id}`)
        .then(employee => {
            res.render('update_employee', { employee: employee.data[0] });
            console.log(employee.data);
        })
        .catch(err => {
            res.send(err);
        })
}

exports.DisplayEmployeeList = (req, res) => {
    Employee.find((err, employeeList) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.render('employee_list', { employee: employeeList });
        }
    });

}