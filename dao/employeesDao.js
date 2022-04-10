const connection = require('./connection-wrapper');


async function getAllEmployees() {
    let sql = `SELECT employeeId, firstName, lastName, email FROM employees`;
    let parameters = [];
    const allEmployees = await connection.executeWithParameters(sql, parameters);
    return allEmployees
}
async function getEmployee(firstName) {
    let sql = `SELECT * FROM employees WHERE firstName=?`;
    let parameters = [firstName];
    const employee = await connection.executeWithParameters(sql, parameters);
    return employee;
}
async function login(loginDetails) {
    let sql = `SELECT * FROM employees WHERE email=? AND password=?`;
    let parameters = [loginDetails.email, loginDetails.password];
    const successfulLoginData = await connection.executeWithParameters(sql, parameters);
    return successfulLoginData;
}

async function register(employee) {
    let sql = `INSERT INTO employees (firstName, lastName, email, password, userType) VALUES (?, ?, ?, ? ,?)`;
    let parameters = [employee.firstName, employee.lastName, employee.email, employee.password, employee.userType];
    const registration = await connection.executeWithParameters(sql, parameters);
    return registration;
}
async function googleRegister(username, email, picture) {
    let sql = `INSERT INTO employees (firstName, email, picture) VALUES (?, ?, ?)`;
    let parameters = [username, email, picture];
    const registerWithGoogleAccount = await connection.executeWithParameters(sql, parameters);
    return registerWithGoogleAccount;
};
async function upsertGoogleAccount(username, email, picture) {
    let sql = `UPDATE employees SET firstNme=?, picture=? WHERE email =?`;
    let parameters = [username, picture, email];
    const updatingGoogleAccountDetails = await connection.executeWithParameters(sql, parameters);
    return updatingGoogleAccountDetails;
};
async function googleLogin(username, email, picture) {
    let sql = `SELECT * FROM employees WHERE firstName=? AND email=?`;
    let parameters = [username, email];
    const registration = await connection.executeWithParameters(sql, parameters);
    if (!registration.length) {
        await googleRegister(username, email, picture);
    }
    const petch = await upsertGoogleAccount(username, email, picture);
    return petch;
}
async function update(dataToUpdate) {
    let sql = `UPDATE employees SET firstName=?, lastName=?, email=?, password=? WHERE employeeId = ?`;
    let parameters = [dataToUpdate.firstName, dataToUpdate.lastName, dataToUpdate.email, dataToUpdate.password, dataToUpdate.employeeId];
    const dataUpdatedSuccessfully = await connection.executeWithParameters(sql, parameters);
    return dataUpdatedSuccessfully;
}
async function deleteEmployee(id) {
    let sql = `DELETE FROM employees WHERE employeeId=?`;
    let parameters = [id];
    await connection.executeWithParameters(sql, parameters);
};
async function isAlreadyRegistered(email) {
    let sql = `SELECT email FROM employees WHERE email=?`;
    let parameters = [email];
    const alreadyRegistered = await connection.executeWithParameters(sql, parameters);
    if (alreadyRegistered.length) {
        return true
    }
    return false
};
module.exports = {
    getAllEmployees,
    getEmployee,
    login,
    googleLogin,
    register,
    update,
    deleteEmployee,
    isAlreadyRegistered
}