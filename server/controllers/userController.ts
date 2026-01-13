import { Request, Response } from "express";
import jwt, { sign, verify } from "jsonwebtoken";
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import { cloudinary } from "../middleware/multer";
import { envConfig } from "../config/env.config";
import { logger } from "../utils/logger";
import RefreshToken from '../models/refreshModel';

const secretKey = envConfig.jwtSecret;
if (!secretKey) {
	throw new Error("JWT_SECRET is not defined in environment variables");
}

export const register = async (req: Request, res: Response) => {
	let image = "";
	const { email, username, password } = req.body;


	if (!email || !username || !password) {
		res.status(400).json({ message: "Please enter all fields" });
		return;
	}

	try {
		if (req.file) {
			const file = req.file;
			image = await new Promise<string>((resolve, reject) => {
				cloudinary.uploader
					.upload_stream({ upload_preset: "art-gallery" }, (error, result) => {
						if (result) resolve(result.url);
						else reject(error);
					})
					.end(file.buffer);
			}).catch((error) => {
				res.status(500).json({ message: "Image upload failed", error });
				return "";
			});
		}
	} catch (err) {
		res.status(500).json({ message: `Image upload falied ${err}` })
		return
	}

	try {
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			res.status(400).json({ message: "User already exists" });
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			email,
			username,
			password: hashedPassword,
			image,
		});
		await newUser.save();

		res.status(201).json({ message: "User registered successfully" });
		return;
	} catch (error) {
		res.status(500).json({ message: "An error occurred", error });
		return;
	}
};

export const authCheck = async (req: Request, res: Response) => {
	try {
		const token = req.cookies['token']

		if (!token) return res.status(401).json({ error: "No token" });

		const decoded = jwt.verify(token, secretKey) as { id: string }

		// Fetch the user from database
		const user = await User.findById(decoded.id).select("-password");
		if (!user) {
			return res.status(401).json({ error: "User not found" });
		}

		logger.debug({ userId: user._id }, 'Auth check succeeded');

		return res.json({ user, token })
	} catch (error) {
		logger.warn({ err: error }, 'Auth check failed');

		return res.status(401).json({ error: "Invalid token" });
	}
}

export const refresher = async (req: Request, res: Response) => {
	const { refreshToken } = req.cookies
	try {
		if (!refreshToken) {
			res.status(403).json({ error: `No refresh token!` })
			return
		}

		const dbToken = await RefreshToken.findOne({ token: refreshToken });
		if (!dbToken) return res.status(403).json({ error: "token reevoked" })

		const decoded = verify(refreshToken, envConfig.jwtRefresh) as {
			id: string
		}

		const user = await User.findById(decoded.id).select("-password")

		if (!user) return res.status(401).json({ error: 'User not found' })

		await RefreshToken.deleteOne({ _id: dbToken._id })

		const payload = {
			id: user.id,
			email: user.email,
			username: user.username,
			image: user.image,
			isAdmin: user.isAdmin,
		};

		const newToken = sign(payload, secretKey, { expiresIn: '1h' })
		const newRefreshToken = sign(payload, envConfig.jwtRefresh, { expiresIn: '1d' })

		const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
		await RefreshToken.create({ user: user._id, token: newRefreshToken, expiresAt })

		res.cookie("token", newToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 24 * 60 * 60 * 1000,
		});

		res.cookie("refreshToken", newRefreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 24 * 60 * 60 * 1000,
		});


		return res.json({ accessToken: newToken })
	} catch (err) {
		return res.status(401).json({ error: "Refresh failed", details: err });
	}
}


export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400).json({ message: "Please enter all fields" });
		return;
	}

	try {
		const user = await User.findOne({ email });
		if (!user) {
			res.status(400).json({ message: "User does not exist" });
			return;
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			res.status(400).json({ message: "Invalid credentials" });
			return;
		}

		const payload = {
			id: user.id,
			email: user.email,
			username: user.username,
			image: user.image,
			isAdmin: user.isAdmin,
		};
		const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
		const refreshToken = sign(payload, envConfig.jwtRefresh, { expiresIn: '1d' })

		const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
		await RefreshToken.create({ user: user._id, token: refreshToken, expiresAt })

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 24 * 60 * 60 * 1000,
		});

		res.json({ message: "Login successful", token, user: { id: user.id, role: user.role, email: user.email, username: user.username, image: user.image } });
		return;
	} catch (error) {
		res.status(500).json({ message: `An error occurred, ${error}` });
		return;
	}
};

export const getUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.params.id).select("-password");
		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}
		res.json(user);
		return;
	} catch (error) {
		res.status(500).json({ message: "An error occurred", error });
		return;
	}
};

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find().select("-password");
		res.json(users);
		return;
	} catch (error) {
		res.status(500).json({ message: "An error occurred", error });
		return;
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		user.username = req.body.username || user.username;
		user.email = req.body.email || user.email;
		user.isAdmin = req.body.isAdmin || user.isAdmin;
		await user.save();

		res.json({ message: "User updated" });
		return;
	} catch (error) {
		res.status(500).json({ message: "An error occurred", error });
		return;
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		res.json({ message: "User removed" });
		return;
	} catch (error) {
		res.status(500).json({ message: "An error occurred", error });
		return;
	}
};

export const logout = async (req: Request, res: Response) => {
	try {
		const { refreshToken } = req.cookies

		await RefreshToken.deleteOne({ token: refreshToken });

		res.clearCookie("token", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
		});

		res.clearCookie("refreshToken", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
		});

		return res.json({ message: "Logged out" });
	} catch (error) {
		res.status(500).json({ message: "An error occurred", error });
		return;
	}
};
