const bookId = document.querySelector("#bookId");
const userNickname = document.querySelector("#kakaoNickname");

document.querySelector(".reviewDelete").addEventListener("click", async (e) => {
  const review_id = e.target.dataset.reviewId;
  const nickname = userNickname.innerHTML;

  const response = await fetch(`/review/${review_id}?nickname=${nickname}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nickname: nickname }),
  });

  const result = await response.json();

  if (result) {
    alert("감상문이 삭제되었습니다.");
    window.location.href = `/bookview/${bookId.innerHTML} `; // 삭제 후 이동할 페이지
  } else {
    alert("감상문 삭제 실패하였습니다.");
  }
});
