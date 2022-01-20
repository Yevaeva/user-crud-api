const Response = require("../models/Response");
const UserSrv = require("../services/user.srv");

module.exports = (app, models) => {
  const userSrv = new UserSrv(models.User);

  app.get("/users", async (req, res) => {
    const srvResp = await userSrv.getUsers(req);
    if (srvResp.hasError)
      return res
        .status(404)
        .send(
          Response.constructResponseErrModel(
            srvResp.error.code || 404,
            srvResp.error.message
          )
        );
    return res.send(Response.constructResponseModel(srvResp.data));
  });

  app.post("/user", async (req, res) => {
    const srvResp = await userSrv.createUser(req.body);
    if (srvResp.hasError)
      return res
        .status(409)
        .send(
          Response.constructResponseErrModel(
            srvResp.error.code || 409,
            srvResp.error.message
          )
        );

    return res.send(Response.constructResponseModel(srvResp.data));
  });

  app.delete("/user/:id", async (req, res) => {
    const { id } = req.params;
    const srvResp = await userSrv.deleteUser(id);
    if (srvResp.hasError)
      return res
        .status(404)
        .send(
          Response.constructResponseErrModel(
            srvResp.error.code || 404,
            srvResp.error.message
          )
        );

    return res.send(Response.constructResponseModel(srvResp.data));
  });

  app.put("/user/:id", async (req, res) => {
    const { id } = req.params;
    const srvResp = await userSrv.updateUser(id, req.body);
    if (srvResp.hasError)
      return res
        .status(404)
        .send(
          Response.constructResponseErrModel(
            srvResp.error.code || 404,
            srvResp.error.message
          )
        );

    return res.send(Response.constructResponseModel(srvResp.data));
  });
};
