import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },  // Add this to track email verification status
  verificationToken: { type: String, default: true }  // Optional: if you want to store the verification token
});

userSchema.pre('save', async function (next) {
  // Hash the password before saving
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  // Clear the verification token once the email is verified
  if (this.isModified('verified') && this.verified) {
    this.verificationToken = '';
  }

  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;

