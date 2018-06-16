require("dotenv").config();
const handler = require("../../services/handler");
const Builds = require("../../models/builds");

module.exports = (req, res) => {
    const id = req.params.buildId;
    const updateOps = {updatedAt: Date.now(),...req.body};
    Builds.update({_id: id}, {$set: updateOps}).exec()
        .then(docs => {
            const reponse = {
                message: "Build updated",
                request: {
                    type: "GET",
                    url: `${process.env.URL}/builds/g/${id}`
                },
                status: 200
            };
            res.status(200).json(reponse)
        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                kind: "Can't find the build."
            });
        })
};