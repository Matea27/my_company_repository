const express = require("express")
const Company = require("../models/company")
const Owner = require("../models/owner")
const router = new express.Router()

router.get("/companies", async (req,res) => {
    try {
        const companies = await Company.find({})
        res.send(companies)
    } catch(e){
        res.status(500).send()
    }
})

router.get("/companies/:id", async (req,res) => {
    const _id = req.params.id
    try {
        const company = await Company.findById(_id)
        if (!company){
            return res.status(404).send()
        }
        res.send(company)
    } catch(e){
        res.status(500).send()
    }
})

router.post("/companies", async (req,res)=> {
    const company = new Company(req.body) 
    try{
        await company.save()
        res.status(201).send(company)
    } catch(e){
        res.status(400).send(e)
    }
})

router.patch("/companies/:id", async (req,res)=> {
        const updates = Object.keys(req.body) 
        const allowedUpdates = ["name", "address", "phone_number","country","email","city","owner"] 
        const isValidOperation = updates.every((update)=> {
           return allowedUpdates.includes(update)
        })
    
        if (!isValidOperation) {
            return res.status(400).send({error: "Invalid updates"}) 
        }
        try {
            const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            
            if(!company){
                return res.status(404).send()
            }
            res.send(company)
        } catch(e){
            res.status(500).send(e)
        }
})

router.delete("/companies/:id", async (req,res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id)
        await Owner.deleteMany({company: company._id})
        if (!company){
            return res.status(404).send()
        }
        res.send(company)
    } catch(e) {
        res.status(500).send()
    }
})

router.delete("/companies", async (req,res) => {
    try {
        const companies = await Company.deleteMany({})
        await Owner.deleteMany({})
        res.send(companies)
    } catch(e) {
        res.status(500).send()
    }
})

router.get("/company/:name/owners", async (req,res) => {
    const name = req.params.name
    try {
        const companies = await Company.find({name}).populate("owner")
        res.send(companies)
    } catch(e){
        res.status(500).send()
    }
})


module.exports = router