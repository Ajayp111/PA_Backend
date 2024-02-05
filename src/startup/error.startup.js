// using console her, instead try logging using a library like winston.


module.exports = () =>{
    process.on("uncaughtException",(err)=>{
        console.log(err.message)
    })
    process.on("unhandledRejection",(err)=>{
        console.log(err.message)
    })
    console.log("🚧 Error Handler Applied")
}
