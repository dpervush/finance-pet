import ApiError from "../exceptions/apiError.js";
import TokenService from "../Token/TokenService.js";

export default function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.AnauthorizedError());
    }

    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.AnauthorizedError());
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.AnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.AnauthorizedError());
  }
}
