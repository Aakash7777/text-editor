const { ObjectId } = require('mongodb');
const UserDoc = require("../models/userdoc.model");

async function create(params, callback) {
  const userDoc = new UserDoc(params);
  userDoc
    .save()
    .then((res) => {
      return callback(null, res);
    })
    .catch((err) => {
      return callback(err);
    });
}

async function update({ id, params }, callback) {
  const userDoc = await UserDoc.updateOne({_id: ObjectId(id)}, { $set: { editorState: params.editorState } });
  if (userDoc) {
    return callback(null, userDoc);
  } else {
    return callback({
      message: "User doc not present for the given id.",
    });
  }
}

async function find({userId}, callback) {
    if(!userId) {
        return callback({
            message: "userId cannot be empty",
          });
    }
    const userDocs = await UserDoc.find({ userId });
    return callback(null, userDocs);
  }

  async function findById({id}, callback) {
    if(!id) {
        return callback({
            message: "Document id cannot be empty",
          });
    }
    const userDoc = await UserDoc.findOne({ _id: id });
    if (userDoc) {
      return callback(null, userDoc);
    } else {
      return callback({
        message: "User doc not present for the given id.",
      });
    }
  }  

module.exports = {
  create,
  update,
  find,
  findById
};
