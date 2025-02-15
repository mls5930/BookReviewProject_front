const loginThumbnail = document.querySelector('.loginThumbnail');
const userThumbInfo = document.createElement("div")
const loginHeader = document.querySelector('.loginHeader');
const bookmark = document.createElement("a")
const commentary = document.createElement("a")
const mypage =  document.createElement("a")
const logout =  document.createElement("a")
const userInfoCloseBtn = document.createElement('div');

loginThumbnail.addEventListener('click', (e) => {
    document.querySelector('.userThumbInfo').style.display = 'block'
});

document.querySelector('.userInfoCloseBtn').addEventListener('click', ()=>{
    document.querySelector('.userThumbInfo').style.display = 'none'
})

