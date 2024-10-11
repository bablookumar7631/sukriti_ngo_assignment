import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";


const register = async(req, res) => {
    const { firstName, lastName, phoneNumber, email, password } = req.body;
    try {
        if ([firstName, lastName, phoneNumber, email, password].some(field => !field || field.trim() === "")) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
    
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(400).json({
                message: 'User already exists with this email.',
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            firstName,
            lastName,
            phoneNumber,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "User registered successfully.",
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An internal server error occurred.",
            success: false
        });
    }
}


const login = async(req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "User logged in successfully.",
            success: true,
            user: user
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred during login.",
            success: false
        });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json({
                message: "No users found.",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Users retrieved successfully.",
            success: true,
            users: users,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An internal server error occurred.",
            success: false,
        });
    }
};

const editUserDetail = async (req, res) => {
    const { userId } = req.params;
    const { firstName, lastName, phoneNumber, email } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          message: "User not found.",
          success: false,
        });
      }
  
      // Update user details
      user.firstName = firstName ?? user.firstName;
      user.lastName = lastName ?? user.lastName;
      user.phoneNumber = phoneNumber ?? user.phoneNumber;
      user.email = email ?? user.email;
  
      await user.save();
  
      return res.status(200).json({
        message: "User details updated successfully.",
        success: true,
        user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "An error occurred while updating user details.",
        success: false,
      });
    }
  };

const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found.',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'User deleted from database.',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while deleting the user.',
      });
    }
};


const getSingleUser = async (req, res) => {
    const { userId } = req.params;
    try {
        // Check if the userId is provided
        if (!userId) {
            return res.status(400).json({
                message: "User ID is required.",
                success: false,
            });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }

        // Return user information (excluding password)
        const { password, ...userInfo } = user.toObject();
        return res.status(200).json({
            message: "User retrieved successfully.",
            success: true,
            data: userInfo,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An internal server error occurred.",
            success: false,
        });
    }
};


const logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            maxAge: 0,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return res.status(200).json({
            message: "Logged out successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Logout failed. Please try again later.",
            success: false
        });
    }
}

export {register, login, getAllUsers, editUserDetail, deleteUser, getSingleUser, logout};