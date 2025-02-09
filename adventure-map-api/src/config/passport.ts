import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: '/auth/google/callback',
      passReqToCallback:true
    },
    async (req,accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ email: profile.emails?.[0].value });

        if (!user) {
          // Create a new user if not found
          user = new User({
            username: profile.displayName,
            email: profile.emails?.[0].value,
            account_type: 'Google',
            password: undefined, // No password needed for Google accounts
          });

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, undefined);
      }
    }
  )
);

export default passport;
