const path = require("path");
// const Vendor = require("../controller/vendor.controller");
const Vendor = require("../controller/vendor.model_mongo");

const router = require("express").Router();
const multer = require("multer");
const logger = require("../helper/logger");

let storage = multer.diskStorage({
  destination: "company_logos/",
  onError: function (err, next) {
    logger.error(err);
    next(err);
  },
  filename: function (req, file, cb) {
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

//get all vendors
router.get("/get", async (req, res) => {
  return await Vendor.fetchAll(req, res)
});

router.get("/:id", async (req, res) => {
  return await Vendor.fetch(req, res)
});






// Login the vendor 


// router.post("/login", Vendor.verifyAndAuthorize);


//router.put("/:id", Vendor.update);
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
  // details.logo_full_path = file.path;
  // details.logo = file.filename;
  // details.logo_content_type = file.mimtype;
  details.id=req.params.id;
  console.log({details: details});
  details.id=req.params.id;
  try {
    // const data = await Vendor.update(details);

    const data = await Vendor.update(details,res);

    // return res.status(200).send({ success: true, data: data });
  } catch (err) {
  //  logger(err);
  console.log(err);
    res.status(400).send({
      success: false,
      error: err,
    });
  }
});


// Create a new Vendor
router.post("/add", async (req, res, next) => {
  companyLogo(req, res, (err) => {
    if (err) {
      console.log("this is the vendor body",req.body)
      res.status(400).json({ message: err });
    }
    next();
  });
});

router.post("/add", async (req, res) => {
  const details = Object.assign({}, req.body);
  console.log("reqfile", req.file);
  const file = req.file || {};
  details.logo_full_path = file.path;
  details.logo = file.filename;
  details.logo_content_type = file.mimtype;
console.log(req.body);
  try {
    const data = await Vendor.create(details,res);
    // const data = await Vendor.create(details);
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

module.exports = router;
