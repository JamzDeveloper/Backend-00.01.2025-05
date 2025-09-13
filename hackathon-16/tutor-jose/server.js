import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import GoogleStrategy from "passport-google-oidc";
import jwt from "jsonwebtoken";
import cors from "cors";
import session from "express-session";
dotenv.config();

const app = express();

app.use(cors());

app.use(
  session({
    secret: "superSecretSession",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  console.log("serializeUser", user);
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  console.log("deserializeUser", user);

  cb(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/oauth2/redirect/google",
      scope: ["profile","email",'openid'],
    },
    (issuer, profile, cb) => {
      console.log("profile", profile);
      console.log("issuer", issuer);

      ///registrar en la db

      //
      /*
      profile {
  id: '105670565042677125400',
  displayName: 'José Montenegro',
  name: { familyName: 'Montenegro', givenName: 'José' }
   emails: [ { value: 'jamzdeveloper@gmail.com' } ]
}
issuer: https://accounts.google.com
*/
      //o
      //puedes seleccionar los datos y pasarlo , cb
      return cb(null, profile);
      /*
      
    {
    displayName
    id
    emails  
    }*/
    }
  )
);

//ruta de login con google
app.get("/auth/google", passport.authenticate("google"));

//callback de google

app.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    //crear el jwt para el usuario

    console.log("req.user", req.user);
    const token = jwt.sign(
      {
        id: req.user.id,
        displayName: req.user.displayName,
        emails: req.user.emails,
      },
      process.env.JWT_SECRET
    );

    res.redirect(`http://localhost:3000/dasboard?toke=${token}`);
  }
);

app.listen(3000, () => {
  console.log("api listen in port 3000");
});
