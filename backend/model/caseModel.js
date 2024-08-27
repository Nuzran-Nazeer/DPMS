import mongoose from "mongoose";

const caseSchema = new mongoose.Schema(
  {
    caseNo: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: [0],
      max: [110],
    },
    profession: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    officerHandling: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PoliceOfficer",
      required: true,
    },
    drugType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
    sharedWithCourt: {
      type: Boolean,
      default: false,
    },
    sharedWithRehab: {
      type: Boolean,
      default: false,
    },
    lastUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "lastUpdatedByModel",
    },
    lastUpdatedByModel: {
      type: String,
      enum: ["Admin", "PoliceOfficer", "DrugPreventionAuthority", "Court"],
    },
    updatedAt: {
      type: Date,
    },
    closedAt: {
      type: Date,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret.lastUpdatedBy;
        delete ret.lastUpdatedByModel;
        return ret;
      },
    },
  }
);

caseSchema.pre("save", function (next) {
    /* This is to only allow during updates*/
    if (this.isModified("officerHandling") && this.isNew === false) {
      // Only allow Admins to modify the officerHandling field
      if (this.lastUpdatedByModel !== "Admin") {
        const err = new Error("Only Admins can modify officerHandling");
        return next(err);
      }
    }
    next();
  });
  

export const Case = mongoose.model("Case", caseSchema);
