const { PORT } = process.env;

module.exports = async (app) => {
  await require("./db.startup")(app); //intiate db connection
  require("./routes.startup")(app); // intiate routes
  require("./error.startup")(); // intiate error handlers

  //Starting Server
  app.listen(PORT || 53321, () => {
    console.log("🚀 Pathak Assoicates is Running on PORT =>", PORT || 53321);
  });
};
