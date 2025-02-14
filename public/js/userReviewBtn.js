const kakaoNickname = document.querySelector("#kakaoNickname");
const updateBtn = document.querySelector(".update-btn");

console.log("script 들어옴");

const getNickname = async () => {
  // httpOnly는,, document로 읽어올 수 없음
  // 내 nickname이랑 작성자 nickname이랑 비교
  // controller.js에서 req.user.nickname으로 가져옴 => html에서 숨겨두고 가져오면 됨
};

console.log(kakaoNickname.innerHTML);

// document.addEventListener("DOMContentLoaded", async function () {
//   const userNickname = await getNickname(); // Cookie에서 가져온 JWT_Token nickname
//   const reviewNickname = kakaoNickname.innerHTML.trim(); // backend에서 받아온 nickname

//   //   nickname 일치할 경우에만 버튼 보여주기
//   if (userNickname && userNickname === reviewNickname) {
//     updateBtn.style.display = "flex";
//   }
// });
