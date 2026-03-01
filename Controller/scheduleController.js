import Schedule from "../Models/scheduleModel.js";

/* CREATE */
export const createSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.create(req.body);
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET ALL */
export const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().populate("trainer");
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET SINGLE */
export const getSingleSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id).populate("trainer");

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE */
export const updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* DELETE */
export const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.json({ message: "Schedule Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};