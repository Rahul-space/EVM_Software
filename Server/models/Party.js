const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PartySchema = new Schema({
    name: {
        type: String,
        required: true
    },

    logo: {
        type: String,
        default: "https://presentations.gov.in/wp-content/uploads/2020/01/NE_Preview1.png?x93559"
    },
    partyID: {
        type: Number,
        required: true,
        unique: true
    },
    votes: {
        type: Number,
        default: 0
    },
    femaleVotes: {
        type: Number,
        default: 0
    },
    maleVotes: {
        type: Number,
        default: 0
    }
}, { timestamps: true });


module.exports = mongoose.model("Party", PartySchema);