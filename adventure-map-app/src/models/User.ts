interface IUser extends Document {
    username: string;
    email: string;
    password: string | undefined;
    account_type:'Password'|'Google';
    comparePassword(candidatePassword: string): Promise<boolean>;
  }

export default IUser