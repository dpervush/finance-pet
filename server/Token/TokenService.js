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

  validateAccessToken(token) {
    try {
      const userData = jsonwebtoken.verify(
        token,
        process.env.JWT_ACCESS_SECRET
      );
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jsonwebtoken.verify(
        token,
        process.env.JWT_REFRESH_SECRET
      );
      return userData;
    } catch (e) {
      return null;
    }
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

  async removeToken(token) {
    const tokenData = await Token.deleteOne({ token });
    return tokenData;
  }

  async findToken(token) {
    const tokenData = await Token.findOne({ refreshToken: token });
    return tokenData;
  }
}

export default new TokenService();
