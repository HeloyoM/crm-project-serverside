const express = require('express');
const router = express.Router();
const employeesLogic = require('../logic/employeesLogic');
const bcrypt = require("bcryptjs");

router.get("/", async (req, res) => {
    try {
        const allEmployees = await employeesLogic.getAllEmployees();
        res.json(allEmployees)
    } catch (e) {
        res.json(e)
    }
})
router.get("/:firstname", async (req, res) => {
    try {
        const firstName = req.params.firstname;
        const employee = await employeesLogic.getEmployee(firstName);
        res.json(employee)
    } catch (e) {
        res.json(e)
    }
})
router.post("/login", async (req, res) => {
    try {
        const loginDetails = req.body;
        const token = await employeesLogic.login(loginDetails);
        console.log(token)
        res.json(token)
    } catch (e) {
        res.json(e)
    }
})
router.post("/", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const employee = req.body;
        employee.password = hashedPassword;
        employee.userType = "employee";
        const registration = await employeesLogic.register(employee);
        res.json(registration);
    } catch (e) {
        res.json(e);
    }
});

router.put("/", async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try {
        const dataToUpdate = req.body;
        dataToUpdate.password = hashedPassword;
        const dataUpdatedSuccessfully = await employeesLogic.update(dataToUpdate);
        res.json(dataUpdatedSuccessfully)
    } catch (e) {
        res.json(e)
    }
})
router.delete("/:id", async(req,res)=>{
    try{
        const id = req.params.id;
        await employeesLogic.deleteEmployee(id)
        res.json()
    }catch(e){
        res.json(e)
    }
})

module.exports = router;