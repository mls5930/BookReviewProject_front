const jwt = require("jsonwebtoken");

// 쿠키에서 JWT_Token 가져와서 Authorization headers에 추가
// 페이지 이동 시 로그인 상태 유지를 위함
const attachAuthToken = async (req, res, next) => {
  try {
    // Cookie에서 가져온 JWT_Token 확인 / 토큰 이상 => next() (main으로 이동)
    const jwt_token = req.cookies?.jwt_token;
    if (!jwt_token) {
      // res.status(401).json({ message: "로그인이 필요합니다." });
      return next();
    }

    req.headers.authorization = `Bearer ${jwt_token}`;
    next();
  } catch (error) {
    return new Error({ message: "유효하지 않은 JWT_Token입니다." });
  }
};

// Authorization에서 JWT_Token 가져와서 검증 / 유효=> req.user=decoded, 무효=> req.user=null
const authMe = async (req, res, next) => {
  try {
    // Authorization에서 JWT_Token 가져옴
    // JWT_Token 없으면 요청 객체에 user를 빈 객체로 설정하고 next()
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      req.user = null;
      return next();
    }
    const token = authHeader.split(" ")[1]; // `Bearer ${Token}`에서 Token값만 가져옴
    //  Token decoding + 검증 후 req.user에 저장
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    req.user = null; // 검증 실패 시 user를 null로 설정
    return res.status(401).json({ message: "유효하지 않은 JWT_Token입니다." });
  }
};


module.exports = { attachAuthToken, authMe  };