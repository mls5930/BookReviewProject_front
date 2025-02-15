const empty = () => {
  const textarea = document.querySelector(".context");

  if (textarea.value.trim() === "") {
    alert("내용을 입력해주세요!");
    textarea.focus(); // 포커스 이동
    return false;
  }
  return true;
};
