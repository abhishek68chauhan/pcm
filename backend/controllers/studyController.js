import Study from "../models/Study.js";

export const addStudy = async (req, res) => {
  try {
    const {
      date,
      physics,
      chemistry,
      mathematics,
    } = req.body;

    const p = Number(physics) || 0;
    const c = Number(chemistry) || 0;
    const m = Number(mathematics) || 0;

    const totalMinutes = p + c + m;

    const study = await Study.findOneAndUpdate(
      {
        userId: req.userId,
        date,
      },
      {
        userId: req.userId,
        date,
        physics: p,
        chemistry: c,
        mathematics: m,
        totalMinutes,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({
      message: "Study saved successfully",
      study,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getStudies = async (req, res) => {
  try {
    const studies = await Study.find({
      userId: req.userId,
    }).sort({ date: -1 });

    res.json(studies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};