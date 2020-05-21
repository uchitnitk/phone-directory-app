const express = require('express')
const User = require('../models/user')
const router = new express.Router()


router.post('/users',(req,res)=>{
    const user = new User(req.body)
    user.save().then(()=>{
          res.send(user)
    }).catch((e)=>{
          res.status(500).send(e)
    })
})

router.get('/users',(req,res)=>{
      User.find({}).then((users)=>{
            res.send(users)
      }).catch((error)=>{
            res.status(500).send(error)
      })
})

router.get('/users/:email',(req,res)=>{
      const email = req.params.email
      User.find({email}).then((user)=>{
          if(user.length==0){
            return res.status(404).send('not found')
          }
          res.send(user)
      }).catch((error)=>{
          res.status(500).send(error)
      })
})

router.patch('/users/:email',(req,res)=>{
      const updates = Object.keys(req.body)
      const allowedUpdates = ['email','city','age','name','contact']
      const isValidOperation = updates.every((update)=>{
            return allowedUpdates.includes(update)
      })

      if(!isValidOperation){
              return res.status(400).send({error : 'Invalid Updates'})
      }
      else{
          const email = req.params.email
          User.findOneAndUpdate({email},req.body,{new : true, runValidators:true}).then((user)=>{
                if(!user){
                  return res.status(404).send('user to be updated not found')
                }
                res.send(user)
          }).catch((error)=>{
                res.status(400).send(error)
          })
      }
})


router.delete('/users/:email',(req,res)=>{
      const email = req.params.email
      User.findOneAndDelete({email}).then((user)=>{
            if(!user){
                return res.status(404).send('user to be deleted not found')
            }
            res.send(user)
      }).catch(()=>{
            res.status(500).send()
      })
})


module.exports = router
