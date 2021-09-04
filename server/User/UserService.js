import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import User from "./User.js";
import TokenService from "../Token/TokenService.js";
import UserDto from "./UserDto.js";
import MailService from "../Mail/MailService.js";
import ApiError from "../exceptions/apiError.js";

class UserService {
  async register(email, password) {
    const candidate = await User.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }

    const hashedPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();
    const user = await User.create({
      email,
      password: hashedPassword,
      activationLink,
    });

    // await MailService.sendActivationMail(
    //   email,
    //   `${process.env.API_URL}/api/activate/${activationLink}`
    // );

    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }

    const userDto = new UserDto(user);

    const tokens = TokenService.generateToken({ ...userDto });

    awaitTokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.AnauthorizedError();
    }

    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.AnauthorizedError();
    }

    const user = await User.findById(userData.id);
    const userDto = new UserDto(user);

    const tokens = TokenService.generateToken({ ...userDto });

    awaitTokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

export default new UserService();
