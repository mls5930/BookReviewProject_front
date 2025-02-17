document.addEventListener("DOMContentLoaded", () => {
  const nickname = document.getElementById("nickname").innerText;

  //   email
  document.getElementById("emailModifyBtn").addEventListener("click", () => {
    const emailValue = document.querySelector("#emailInput").value;

    fetch(`http://localhost:3000/user/update/${encodeURIComponent(nickname)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailValue }), // email 값만 전송
    })
      .then((response) => response.text()) // JSON 대신 text로 변환해서 확인
      .then((text) => {
        console.log("서버 응답:", text);
        return JSON.parse(text); // JSON으로 변환
      })
      .then((data) => alert(data.message)) // 성공 메시지 출력
      .catch((error) => console.error("에러 발생:", error));
  });

  //   introductions
  document
    .getElementById("introduceModifyBtn")
    .addEventListener("click", () => {
      const introduceValue = document.getElementById("introduceInput").value;

      fetch(
        `http://localhost:3000/user/update/${encodeURIComponent(nickname)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ introductions: introduceValue }), // introductions 값만 전송
        }
      )
        .then((response) => response.text()) // JSON 대신 text로 변환해서 확인
        .then((text) => {
          console.log("서버 응답:", text);
          return JSON.parse(text); // JSON으로 변환
        })
        .then((data) => alert(data.message)) // 성공 메시지 출력
        .catch((error) => console.error("에러 발생:", error));
    });
});
