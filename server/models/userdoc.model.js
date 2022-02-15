const mongoose = require("mongoose");   
const { Schema } = mongoose;

const UserDocSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    editorState: {
        type: Object,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

UserDocSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const UserDoc =  mongoose.model("userdoc", UserDocSchema);

module.exports = UserDoc;