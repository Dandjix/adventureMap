import { Schema, model, Document } from 'mongoose';

// Define the User interface
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

// Define the User schema
const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create and export the User model
const User = model<IUser>('User', userSchema);
export default User;