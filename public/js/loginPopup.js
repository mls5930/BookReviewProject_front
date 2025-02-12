
const logoLogin = document.querySelector('.logoLogin');
const closeBtn = document.querySelector('.closeBtn');
const modal = document.querySelector('.loginBox');
closeBtn.onclick = () => {
    modal.close();
}
logoLogin.addEventListener('click', (e) => {
    e.preventDefault();
    modal.showModal();
})