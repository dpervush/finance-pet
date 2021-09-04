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
    const tokens = await TokenService.generateToken({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

export default new UserService();
