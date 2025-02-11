const loginThumbnail = document.querySelector('.loginThumbnail');
const userThumbInfo = document.createElement("div")
const loginHeader = document.querySelector('.loginHeader');
const bookmark = document.createElement("a")
const commentary = document.createElement("a")
const mypage =  document.createElement("a")
const logout =  document.createElement("a")
const userInfoCloseBtn = document.createElement('div');

loginThumbnail.addEventListener('click', (e) => {
    userInfoCloseBtn.innerHTML = "✖";
    bookmark.innerHTML= "북마크";
    mypage.innerHTML= "내정보";
    commentary.innerHTML="감상문";
    logout.innerHTML="로그아웃";
    userThumbInfo.classList.add("userThumbInfo");
    userInfoCloseBtn.classList.add('userInfoCloseBtn')
    bookmark.classList.add("bookmark");
    mypage.classList.add("mypage");
    commentary.classList.add("commentary");
    logout.classList.add("logout");
    loginHeader.append(userThumbInfo);
    loginHeader.append(userInfoCloseBtn);
    userThumbInfo.append(bookmark);
    userThumbInfo.append(mypage);
    userThumbInfo.append(commentary);
    userThumbInfo.append(logout);
    bookmark.href="/bookmark";
    mypage.href="/mypage";
    commentary.href="/commentary";
    logout.href="/logout"; 
});

userInfoCloseBtn.addEventListener('click', (e) => {
    userThumbInfo.remove();
    userInfoCloseBtn.remove();
})
