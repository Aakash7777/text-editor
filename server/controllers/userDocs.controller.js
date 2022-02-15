const userDocsServices = require("../services/userDocs.service");

exports.create = (req, res, next) => {
  userDocsServices.create(req.body, (error, result) => {
    if (error) {
      return next(error);
    }

    return res.status(200).send({
      message: "Success",
      data: result,
    });
  });
};

exports.update = (req, res, next) => {
  const { id, params } = req.body;
  userDocsServices.update({ id, params }, (error, result) => {
    if (error) {
      return next(error);
    }

    return res.status(200).send({
      message: "Success",
      data: result,
    });
  });
};

exports.find = (req, res, next) => {
  const { userId } = req.query;
  userDocsServices.find({ userId }, (error, result) => {
    if (error) {
      return next(error);
    }

    return res.status(200).send({
      message: "Success",
      data: result,
    });
  });
};

exports.findById = (req, res, next) => {
  const { id } = req.query;
  userDocsServices.findById({ id }, (error, result) => {
    if (error) {
      return next(error);
    }

    return res.status(200).send({
      message: "Success",
      data: result,
    });
  });
};

// router.get('/:id', (req, res, next) => {
//     userServices.getById(req.params.id).then(
//         (user) => res.json(user)
//     ).catch(err => next(err))
// }
