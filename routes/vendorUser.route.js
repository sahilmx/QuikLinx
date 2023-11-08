const path = require("path");
const logger = require("../helper/logger");
const multer  = require('multer');
const VendorUser = require("../controller/vendorUser.controller");
const router = require("express").Router();

// const upload = multer();
// var getFields = multer();


let storage = multer.diskStorage({
  destination: "vendor_images/",
  onError: function (err, next) {
    logger.error(err);
    next(err);
  },
  filename: function (req, file, cb) {
    console.log(file);
    let new_file_name =
      new Date().getTime() + "." + file.originalname.split(".")[1];

    cb(null, new_file_name);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Only Images Allowed!");
  }
}

const upload = multer({
  storage: storage,
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
});


const companyLogo = upload.single("file");


//Create a new VendorUser
router.post("/add", async (req, res, next) => {

  console.log("1st route");
  companyLogo(req, res, (err) => {
    if (err) {
      res.status(400).json({ message: err });
    }
  
  
   next();

  });
});


// router.post("/add",async function(req, res) {

//    const details = Object.assign({}, req.body);
//   console.log({details});
//   const file = req.file || {};
//   details.logo_full_path = file.path;
//   details.logo = file.filename;
//   details.logo_content_type = file.mimtype;
// //console.log(req.body);
//   try {
//     const data = await VendorUser.create(details);
//   console.log("this is in route", data);
//     return res.status(200).send({ success: true, data: data });
//   } catch (err) {
//    // logger(err);
//   console.log(err);

//     res.status(400).send({
//       success: false,
//       error: err,
//     });
//   }
// });


router.post("/add",  async (req, res) => {
  console.log("inside next route");

  //console.log("thisisheader in next route",req.headers['slug']);
  const details = Object.assign({}, req.body);
  console.log({details});
  const file = req.file || {};
  details.logo_full_path = file.path;
  details.logo = file.filename;
  details.logo_content_type = file.mimtype;
//console.log(req.body);
  try {
    const data = await VendorUser.create(details);
  console.log("this is in route", data);
    return res.status(200).send({ success: true, data: data });
  } catch (err) {
   // logger(err);
  console.log(err);

    res.status(400).send({
      success: false,
      error: err,
    });
  }
});

//get all vendors

router.get("/get", VendorUser.findAll);

router.get("/:id", VendorUser.findOne);



// Login the vendor 


router.post("/login", VendorUser.verifyAndAuthorize);


//router.put("/:id", VendorUser.update);
router.put("/:id", async (req, res, next) => {
  companyLogo(req, res, (err) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    next();
  });
});

router.put("/:id", async (req, res) => {
  const details = Object.assign({}, req.body);
  console.log("reqfile", req.file);
  const file = req.file || {};
  details.logo_full_path = file.path;
  details.logo = file.filename;
  details.logo_content_type = file.mimtype;
  details.id=req.params.id;
  details.slug=req.headers.slug;


  try {
    const data = await VendorUser.update(details);
    console.log("this is in route", data);
    return res.status(200).send({ success: true, data: data });
  } catch (err) {
  //  logger(err);
  console.log(err);
    res.status(400).send({
      success: false,
      error: err,
    });
  }
});



module.exports = router;
