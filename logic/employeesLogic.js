const employeesDao = require('../dao/employeesDao');
const ServerError = require('../error/serverError');
const errorType = require("../error/errorType");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const { secret } = require('../config.json');
const connection = require("../dao/connection-wrapper");

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
const dotenv = require('dotenv');
dotenv.config();

async function getAllEmployees() {
    const allEmployees = await employeesDao.getAllEmployees();
    return allEmployees;
};
async function getEmployee(firstName) {
    const employee = await employeesDao.getEmployee(firstName);
    return employee;
}
async function login(loginDetails) {
    const findEmployee = await connection.executeWithParameters(`SELECT * FROM employees WHERE email=?`, [loginDetails.email]);
    if (!findEmployee.length) {
        throw new ServerError(errorType.INVALID_EMAIL_ADDRESS.message);
    }
    const employee = Object.assign({}, {
        id: findEmployee[0].employeeId,
        firstName: findEmployee[0].firstName,
        lastName: findEmployee[0].lastName,
        email: findEmployee[0].email,
        password: findEmployee[0].password,
        userType: findEmployee[0].userType
    });

    if (!await bcrypt.compare(loginDetails.password, employee.password)) {
        throw new ServerError(errorType.INVALID_PASSWORD.message);
    } else {
        await employeesDao.login(loginDetails);
        const token = jwt.sign(employee, secret);
        return token;
    }
}
async function googleLogin(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
    });
    const { name: username, email, picture } = ticket.getPayload();
    await employeesDao.googleLogin(username, email, picture);
    const tokenId = jwt.sign({ username, email, picture }, secret);
    return tokenId;
};

async function register(employee) {
    const checkEmail = await employeesDao.isAlreadyRegistered(employee.email);
    if (checkEmail) {
        throw new ServerError(errorType.EMAIL_ALREADY_REGISTERED.message)
    }
    const token = jwt.sign(employee, secret);
    await employeesDao.register(employee);
    return token;
};
async function update(dataToUpdate) {
    const token = jwt.sign(dataToUpdate, secret);
    await employeesDao.update(dataToUpdate);
    return token;
}
async function deleteEmployee(id) {
    await employeesDao.deleteEmployee(id);
}
module.exports = {
    getAllEmployees,
    getEmployee,
    login,
    googleLogin,
    register,
    update,
    deleteEmployee
}

