import passport from "passport";
import {
	ExtractJwt,
	StrategyOptions,
	Strategy as JwtStrategy,
} from "passport-jwt";
import User from "../models/userModel";
import { Request } from "express";
import { envConfig } from "./env.config";

const opts: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: envConfig.jwtSecret as string,
	passReqToCallback: true,
};

passport.use(
	new JwtStrategy(opts, async (req: Request, payload: any, done: any) => {
		try {
			const user = await User.findById(payload.id);

			if (user) return done(null, user);

			return done(null, false);
		} catch (err) {
			return done(err, false);
		}
	})
);

export default passport;