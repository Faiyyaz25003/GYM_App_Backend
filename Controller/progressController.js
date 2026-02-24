import Progress from "../Models/progressModels.js";

// 🔥 Create & Analyze Progress
export const analyzeProgress = async (req, res) => {
  try {
    const { beforeImage, afterImage } = req.body;

    if (!beforeImage || !afterImage) {
      return res.status(400).json({ message: "Images required" });
    }

    // 🔥 Dummy AI Logic (Later you can integrate real AI)
    const result = {
      weightLoss: "5 kg",
      waistReduce: "3 inches",
      fatLoss: "6%",
      improvement: "12",
      summary: "🔥 Amazing fat loss & visible muscle toning detected!",
    };

    const newProgress = await Progress.create({
      beforeImage,
      afterImage,
      ...result,
    });

    res.status(201).json(newProgress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📊 Get All Progress Records
export const getAllProgress = async (req, res) => {
  try {
    const data = await Progress.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};