const { singleFileUploadMiddleware, multipleFileUploadMiddleware } = require("../middlewares/file-upload.middlewares");
const { uploadFile } = require("../setup/s3.setup");


const router = require("express").Router();

router.post("/single",singleFileUploadMiddleware("file"),async (req,res)=>{
    const file = await uploadFile(req.file);
    res.send({fileUrl:file.Location})
})
router.post("/multiple",multipleFileUploadMiddleware("files"),async (req,res)=>{
    // console.log({files:req.file},req.files);
    let response = [];
    const promises = [];
    for (let file of req.files) {
        response.push({originalname:file.originalname});
        promises.push(uploadFile(file));
    }
    const result = await Promise.all(promises);
    console.log({result});

    for (let i = 0 ; i<result.length;i++) response[i]={...response[i],link:result[i].Location}

    // const file = await uploadFile(req.file);
    res.send({result:response})
})
module.exports.FileUploadRouter = router