// Cookie에서 JWT_Token 가져옴
function getNickname() {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("JWT_Token="))
      ?.split("=")[1];
  
    if (!token) return null;
  
    //   JWT_Token payload 디코딩해서 nickname 가져옴
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.nickname;
    } catch (error) {
      console.error("토큰 오류:", error);
      return null;
    }
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const userNickname = getNickname(); // Cookie에서 가져온 JWT_Token nickname
    const reviewNickname = "{{bookData.User.nickname}}"; // backend에서 받아온 nickname
    //   const userNickname = "kim";
    //   const reviewNickname = "kim";
  
    //   nickname 일치할 경우에만 버튼 보여주기
    if (userNickname && userNickname === reviewNickname) {
      document.querySelector(".update-btn").style.display = "flex";
    }
  });
  
