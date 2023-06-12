const mongoose = require('mongoose')
const offerSchema = new mongoose.Schema({
    username:String,
    offer_id: String,
    offer_title: String,
    offer_description: String,
    offer_image: String,
    offer_sort_order: String,
    content: Array,
    schedule: Object,
    target: String,
    pricing: Number

});

const offer = mongoose.model("offer", offerSchema);
module.exports = offer