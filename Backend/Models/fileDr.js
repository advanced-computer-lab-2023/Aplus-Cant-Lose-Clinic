const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    files: [
      {
        title: {
          type: String,
          required: true,
          trim: true
        },
        description: {
          type: String,
          required: true,
          trim: true
        },
        file_path: {
          type: String,
          required: true
        },
        file_mimetype: {
          type: String,
          required: true
        }
      }
    ],
    drID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", // Reference to the Doctor model
      required: true,
    },
  },
  {
    timestamps: true
  }
);

const File = mongoose.model('FileDr', fileSchema);

module.exports = File;
