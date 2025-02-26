import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "dotenv";
import userSchema from "../models/user.schema.js";
config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://love-project-api.onrender.com/api/user/google/callback",
    },

    async (_, __, profile, done) => {
      try {
        console.log(
          "process.env.GOOGLE_CLIENT_ID",
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_CLIENT_SECRET
        );
        console.log(profile);
        const existingUser = await userSchema.findOne({
          $or: [
            { googleId: profile?.id },
            { userEmail: profile.emails[0].value },
          ],
        });
        console.log(existingUser);
        if (existingUser) {
          if (!existingUser.googleId) {
            existingUser.googleId = profile.id;

            // if (!existingUser?.avatar?.url) {
            //   existingUser.avatar = {
            //     url: profile.photos[0].value,
            //     publicId: "",
            //   };
            // }

            await existingUser.save();
          }

          return done(null, existingUser);
        }

        const user = await userSchema.create({
          googleId: profile.id,
          fullName: profile.displayName,
          userPassword: profile.id,
          userEmail: profile.emails[0].value,
          userName: profile.emails[0].value.split("@")[0],
          //   loginType: "google",
        });

        console.log("hello", user);

        return done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;
