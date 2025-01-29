const { default: mongoose, model, models } = require("mongoose");

const agreementModel = mongoose.Schema({
    ownerDetails: {},
    tenantDetails: {},
    propertyDetails: {},
    agreementTerms: {},
    annexures: {}
})
const RentAgreement = mongoose.model("RentAgreement",agreementModel);
module.exports = RentAgreement