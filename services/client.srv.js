const ObjectId = require("mongoose").Types.ObjectId;
const AsyncFunctionResponse = require("../models/AsyncFunctionResponse");
const errorMessages = require("../utils/errorMessages");

class ClientSrv {
  constructor(model, services = {}) {
    this.model = model;
    this.services = services;
  }

  async createClient(body) {
    const { email, phone } = body;

    try {
      const emailIsExist = await this.model.findOne({ email });
      if (emailIsExist) {
        const err = new Error(errorMessages.emailAlreadyExists);
        return AsyncFunctionResponse.constructResponseErrModel(err);
      }

      const client = await this.model
        .findOneAndUpdate({ _id: ObjectId() }, body, {
          new: true,
          upsert: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        })
        .lean();
      return AsyncFunctionResponse.constructResponseModel(client);
    } catch (err) {
      return AsyncFunctionResponse.constructResponseErrModel(err);
    }
  }

  async getClients() {
    try {
      const clientsResp = await this.model.find().lean();
      if (!clientsResp) {
        const err = new Error(errorMessages.clientNotFound);
        return AsyncFunctionResponse.constructResponseErrModel(err);
      }
      return AsyncFunctionResponse.constructResponseModel(
        clientsResp.reverse()
      );
    } catch (err) {
      return AsyncFunctionResponse.constructResponseErrModel(err);
    }
  }

  async getClientById(id) {
    try {
      const clientResp = await this.model
        .findOne({ _id: id })
        .populate("providers")
        .lean();
      if (!clientResp) {
        const err = new Error(errorMessages.clientNotFound);
        return AsyncFunctionResponse.constructResponseErrModel(err);
      }
      return AsyncFunctionResponse.constructResponseModel(clientResp);
    } catch (err) {
      return AsyncFunctionResponse.constructResponseErrModel(err);
    }
  }

  async deleteClient(id) {
    try {
      const clientResp = await this.model.findOneAndDelete({ _id: id });
      if (!clientResp) {
        const err = new Error(errorMessages.clientNotFound);
        return AsyncFunctionResponse.constructResponseErrModel(err);
      }
      return AsyncFunctionResponse.constructResponseModel(clientResp);
    } catch (err) {
      return AsyncFunctionResponse.constructResponseErrModel(err);
    }
  }

  async updateClient(id, body) {
    const { email, phone } = body;
    const emailIsExist = await this.model.findOne({ email });
    if (emailIsExist) {
      const err = new Error(errorMessages.emailAlreadyExists);
      return AsyncFunctionResponse.constructResponseErrModel(err);
    }

    try {
      const client = await this.model
        .findByIdAndUpdate({ _id: id }, body, { new: true })
        .populate("providers")
        .lean();
      if (!client) {
        const err = new Error(`Cant find client with id ${id}`);
        return AsyncFunctionResponse.constructResponseErrModel(err);
      }

      return AsyncFunctionResponse.constructResponseModel(client);
    } catch (err) {
      return AsyncFunctionResponse.constructResponseErrModel(err);
    }
  }
}

module.exports = ClientSrv;
