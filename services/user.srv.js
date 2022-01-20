const ObjectId = require("mongoose").Types.ObjectId;
const AsyncFunctionResponse = require("../models/AsyncFunctionResponse");
const errorMessages = require("../utils/errorMessages");

class UserSrv {
  constructor(model, services = {}) {
    this.model = model;
    this.services = services;
  }

  async createUser(body) {
    const { email, phone } = body;

    try {
      const emailIsExist = await this.model.findOne({ email });
      if (emailIsExist) {
        const err = new Error(errorMessages.emailAlreadyExists);
        return AsyncFunctionResponse.constructResponseErrModel(err);
      }

      const user = await this.model
        .findOneAndUpdate({ _id: ObjectId() }, body, {
          new: true,
          upsert: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        })
        .lean();
      return AsyncFunctionResponse.constructResponseModel(user);
    } catch (err) {
      return AsyncFunctionResponse.constructResponseErrModel(err);
    }
  }

  async getUsers(req) {
    try {
      const { query } = req;

      const dbQuery = {};

      if (query.search) {
        const searchReg = new RegExp(query.search, "ig");
        dbQuery.$or = [
          { name: searchReg },
          { surname: searchReg },
          { address: searchReg },
          { phone: searchReg },
          { email: searchReg },
        ];
      }
      const usersResp = await this.model.find(dbQuery).lean();
      if (!usersResp) {
        const err = new Error(errorMessages.userNotFound);
        return AsyncFunctionResponse.constructResponseErrModel(err);
      }
      return AsyncFunctionResponse.constructResponseModel(usersResp.reverse());
    } catch (err) {
      return AsyncFunctionResponse.constructResponseErrModel(err);
    }
  }

  async deleteUser(id) {
    try {
      const userResp = await this.model.findOneAndDelete({ _id: id });
      if (!userResp) {
        const err = new Error(errorMessages.userNotFound);
        return AsyncFunctionResponse.constructResponseErrModel(err);
      }
      return AsyncFunctionResponse.constructResponseModel(userResp);
    } catch (err) {
      return AsyncFunctionResponse.constructResponseErrModel(err);
    }
  }

  async updateUser(id, body) {
    try {
      const user = await this.model
        .findByIdAndUpdate({ _id: id }, body, { new: true })
        .lean();
      if (!user) {
        const err = new Error(`Cant find user with id ${id}`);
        return AsyncFunctionResponse.constructResponseErrModel(err);
      }

      return AsyncFunctionResponse.constructResponseModel(user);
    } catch (err) {
      return AsyncFunctionResponse.constructResponseErrModel(err);
    }
  }
}

module.exports = UserSrv;
