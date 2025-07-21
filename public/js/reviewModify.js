const form = document.querySelector(".text");
const context = document.querySelector(".textbox");
const updateButton = document.querySelector(".reviewUpdate-btn");
const userNickname = document.querySelector("#userId");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const review_id = updateButton.dataset.reviewId;
  const nickname = userNickname.innerHTML;

  try {
    const response = await fetch(`http://localhost:3000/review/${review_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ context: context.value, nickname: nickname }),
    });

    const result = await response.json();

    if (result === "success") {
      alert("감상문이 수정되었습니다.");
      window.location.href = `/reviewdetail/${review_id}?nickname=${nickname}`; // 수정 후 이동할 페이지
    } else {
      alert("감상문 수정 실패하였습니다.");
    }
  } catch (error) {
    console.log("감상문 수정 오류", error);
    alert("감상문 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
  }
});
