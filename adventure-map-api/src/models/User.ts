import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the User interface
export interface IUser extends Document {
  username: string;
  email: string;
  password: string | undefined;
  account_type:'Password'|'Google';
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the User schema
const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  account_type:{type:String,enum:['Password','Google'],default:'Password'},
  password: { type: String},
});

// Hash the password before saving the user
userSchema.pre<IUser>('save', async function (next) {
    if(this.account_type!='Password')
    {
        return next()
    }

    if (!this.password){
        return next(new Error('User has account type "Password" but no password is provided!'));
    }
    if (!this.isModified('password')) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create and export the User model
const User = model<IUser>('User', userSchema);
export default User;