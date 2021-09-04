import jsonwebtoken from "jsonwebtoken";
import Token from "./Token.js";

class TokenService {
  generateToken(payload) {
    const accessToken = jsonwebtoken.sign(
      payload,
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "30m",
      }
    );
    const refreshToken = jsonwebtoken.sign(
      payload,
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "10d",
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await Token.create({ user: userId, refreshToken });
    return token;
  }
}

export default new TokenService();
