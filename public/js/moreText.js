const toggleButton = document.getElementById('toggleButton');
const commentwritey = document.getElementById('commentwritey');

toggleButton.addEventListener('click', () => {
    commentwritey.classList.toggle('expanded');

    if (commentwritey.classList.contains('expanded')) {
        toggleButton.textContent = '줄이기';
    } else {
        toggleButton.textContent = '더보기';
    }
});
