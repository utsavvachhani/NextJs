import mongoose from "mongoose";  

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true
  },
  photo: {
    type: String  
  },
  bio: String,
  address: String,
  dateOfBirth: Date,
  updatedHistory: [
    {
      updatedAt: {
        type: Date,
        default: Date.now
      },
      note: String
    }
  ]
}, { timestamps: true });

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;