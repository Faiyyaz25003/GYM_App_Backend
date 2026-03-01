    import mongoose from "mongoose";

    const scheduleSchema = new mongoose.Schema(
    {
        className: {
        type: String,
        required: true,
        },
        days: [
        {
            type: String,
        },
        ],
        startTime: {
        type: String,
        required: true,
        },
        endTime: {
        type: String,
        required: true,
        },
        trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trainer",
        required: true,
        },
        maxMembers: {
        type: Number,
        required: true,
        },
        status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
        },
    },
    { timestamps: true }
    );

    export default mongoose.model("Schedule", scheduleSchema);