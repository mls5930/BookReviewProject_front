document.addEventListener("DOMContentLoaded", function () {
  const kakaoNickname = document.querySelector("#kakaoNickname");
  const loginUser = document.querySelector("#loginUser");
  const updateBtn = document.querySelector(".update-btn");

  if (!kakaoNickname || !loginUser || !updateBtn) {
    console.error("필요한 요소를 찾을 수 없습니다.");
    return;
  }

  const userNickname = loginUser.innerHTML.trim(); // Cookie에서 가져온 JWT_Token nickname
  const reviewNickname = kakaoNickname.innerHTML.trim(); // backend에서 받아온 nickname

  //   nickname 일치할 경우에만 버튼 보여주기
  if (userNickname === reviewNickname) {
    console.log("작성자 본인 감상문 => 버튼 표시");
    updateBtn.style.display = "flex";
  } else {
    console.log("본인 감상문이 아님 => 버튼 숨김");
    updateBtn.style.display = "none";
  }
});
