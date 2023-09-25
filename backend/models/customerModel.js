import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: String,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
