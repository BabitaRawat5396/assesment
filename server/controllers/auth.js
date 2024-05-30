const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createConnection } = require("../config/database");

exports.login = async (req, res) => {
  try {
    // Fetch data
    const { email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    // Email validation
    const isEmailValid = validator.isEmail(email, {
      domain_specific_validation: true,
      blacklisted_chars: "!#$%",
    });

    if (!isEmailValid) {
      return res.json({
        success: false,
        message: "Email address is not valid",
      });
    }

    // Create MySQL connection
    const connection = await createConnection();

    // Query to check if email exists and retrieve user data
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    const user = rows[0];
    
    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email does not exist, please sign up first",
      });
    }

    // Check if password is correct
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user.id,
        role: user.role, // Ensure this field exists in your database
      };

      const token = jwt.sign(payload, process.env.JWT_KEY_SECRET, {
        expiresIn: "24h",
      });

      if (!token) {
        return res.json({
          success: false,
          message: "Unable to generate token, Please try again.",
        });
      }

      // Return success response with token and user details
      return res.status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    } else {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: "Password incorrect",
      });
    }
  } catch (error) {
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
      error: error.message,
    });
  }
};
