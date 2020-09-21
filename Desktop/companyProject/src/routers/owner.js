const express = require("express")
const Owner = require("../models/owner")
const Company = require("../models/company")
const router = new express.Router()

router.get("/owners", async (req,res) => {
    try{
        const owners = await Owner.find({})
        res.send(owners)
    } catch(e){
        res.status(500).send()
    }
})

router.get("/owners/:id", async (req,res)=> {
    const _id = req.params.id

    try{
        const owner = await Owner.findById(_id)
        if(!owner){
            return res.status(404).send()
        }
        res.send(owner)
    } catch(e){
        res.status(500).send()
    }
}) 

router.post("/:companyId/owners", async (req,res)=> {
    const {companyId} = req.params
    const newOwner = new Owner(req.body) 
    const matchCompany = await Company.findById(companyId)
    newOwner.company = matchCompany
     try{
         await newOwner.save()
         res.status(201).send(newOwner)
         matchCompany.owner.push(newOwner)
         await matchCompany.save()
         
     } catch(e){
         res.status(500).send()
     }
     
 })

router.patch("/owners/:id", async (req,res) =>  {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name","surname","company"]
    const isValidOperation = updates.every((update)=> {
        return allowedUpdates.includes(update)
    })
    if (!isValidOperation){
        return res.status(400).send({error: "Invalid updates"})
    }

    try{
        const owner = await Owner.findByIdAndUpdate(req.params.id,req.body, {new: true, runValidators: true})
        
        if(!owner){
            return res.status(404).send()
        }
        res.send(owner)
    } catch(e){
        res.status(500).send(e)
    }
})


module.exports = router