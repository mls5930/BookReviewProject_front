document.addEventListener("DOMContentLoaded", function () {
  const loginUser = document.querySelector("#loginUser");
  const writeBtn = document.querySelector(".commentary-btn");
  const context = document.querySelector(".context");

  const userNickname = loginUser.innerHTML.trim();

  if (userNickname) {
    console.log("KAKAO LOGIN 사용자");
    writeBtn.style.display = "flex";
    context.style.display = "flex";
  } else {
    console.error("KAKAO LOGIN 후 이용 가능한 서비스입니다.");
    writeBtn.style.display = "none";
    context.style.display = "none";
    return;
  }
});
