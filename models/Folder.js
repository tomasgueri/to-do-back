const mongoose = require('mongoose');
const FolderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        trim: true
    },
    toDo: [
        {
            bodyItem: {
                type: String,
                trim: true,
            },
            check: {
                type: Boolean,
                default: false,
            },
        },
    ],
    // userId: {
    //     type: String,
    //     trim: true,
    //     required: true,
    // },
});

module.exports = mongoose.model('Folder', FolderSchema);
