    const Admin = require("../controller/admin.controller");
    const router = require('express').Router();

    
  
    // Create a new Tutorial
    router.post("/add", Admin.create);

    //Validate all the protected routes

    router.get('/validate', async (req, res) => {
        if (req.token_data) {
          return res.send(
            {
              not_verified: false
            }
          )
        } else {
          return res.send({
            not_verified: true
          })
        }
      });

    // Retrieve all Admin
    router.post("/login", Admin.verifyAndAuthorize);
  
    // Retrieve all published Admin
    router.post("/logout", Admin.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", Admin.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", Admin.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", Admin.delete);
  
    // Delete all Admin
    router.delete("/", Admin.deleteAll);
  
    module.exports = router;
