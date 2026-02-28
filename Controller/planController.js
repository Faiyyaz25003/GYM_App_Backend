import Plan from "../Models/planModels.js";

/* CREATE PLAN */
export const createPlan = async (req, res) => {
  try {
    const newPlan = new Plan(req.body);
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET ALL PLANS */
export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* DELETE PLAN */
export const deletePlan = async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.json({ message: "Plan Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};