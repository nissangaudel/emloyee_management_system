const express = require('express');
const route = express.Router();
const render = require('../services/render.js')
const employee = require('../services/employee')
const shift = require('../services/shifts');


route.get('/', render.HomeRoute);

route.get('/login_page/:type', render.LoginRoute);
route.get('/admin_home', render.AdminHomeRoute);
route.get('/new_employee_form', render.DisplayNewEmployeeForm);
route.get('/employee_list', render.DisplayEmployeeList);
route.get('/edit_employee', render.DisplayUpdatePage);
route.get('/get_employee', employee.GetAllEmployee);
route.post('/new_employee_form', employee.AddEmployee);
route.put('/update_employee/:id', employee.Update);
route.get('/remove_employee/:id', employee.Delete);

route.post('/login_page/clockin', shift.start);
route.post('/login_page/clockout/', shift.end);

module.exports = route;
