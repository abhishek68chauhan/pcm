import mongoose from "mongoose";

const studySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    physics: {
      type: Number,
      default: 0,
    },

    chemistry: {
      type: Number,
      default: 0,
    },

    mathematics: {
      type: Number,
      default: 0,
    },

    totalMinutes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

studySchema.index(
  { userId: 1, date: 1 },
  { unique: true }
);

const Study = mongoose.model("Study", studySchema);

export default Study;