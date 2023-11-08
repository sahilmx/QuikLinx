const path = require("path");
const logger = require("../helper/logger");
const multer = require("multer");
const Gift = require("../controller/gifts.controller");
const { deprecationHandler } = require("moment");
const router = require("express").Router();

let storage = multer.diskStorage({
  destination: "gift_images/",
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


// Create a new QrHistory
//router.post("/", Gift.create);

router.post("/add", async (req, res, next) => {
  console.log("1st route");
  companyLogo(req, res, async (err) => {
    if (err) {
      res.status(400).json({ message: err });
    }

   await next();
   // callNectFunction();
  });
});

router.post("/add", async (req, res) => {
  console.log("inside next route");
  console.log("This is Slug",req.headers.slug);

  const details = Object.assign({}, req.body);
  console.log({ details });
  const file = req.file || {};
  details.logo_full_path = file.path;
  details.g_image = file.filename;
  details.logo_content_type = file.mimtype;
  details.slug=req.headers.slug;
  //console.log(req.body);
  try {
    const data = await Gift.create(details);
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
    const data = await Gift.update(details);
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



// Retrieve all Gift
router.get("/all", Gift.findAll);

// Retrieve a single Tutorial with id
router.get("/:id", Gift.findOne);

// Update a Tutorial with id
//router.put("/:id", Gift.update);

// Delete a Tutorial with id
router.delete("/:id", Gift.delete);

// Delete all Gift
router.delete("/", Gift.deleteAll);

module.exports = router;
