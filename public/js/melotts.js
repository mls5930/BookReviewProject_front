/**
 * Blob 데이터를 받아 <audio> 태그에 할당하고 재생하는 함수
 * @param {Blob} blob - WAV 파일 Blob 데이터
 */

function playAudio(blob) {
    const audioURL = URL.createObjectURL(blob);
    const audioElem = document.getElementById("audioPlayer");
    audioElem.src = audioURL;
    audioElem.play().catch(error => console.error("오디오 재생 실패:", error));
}

// Audio player 컨트롤
const audio = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPause');
const playPauseIcon = document.getElementById('playPauseIcon');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const currentTimeElem = document.querySelector('.current-time');
const durationElem = document.querySelector('.duration');

// 재생/일시정지 토글
playPauseBtn.addEventListener('click', () => {
if (audio.paused) {
    audio.play();
    playPauseIcon.textContent = 'pause';
} else {
    audio.pause();
    playPauseIcon.textContent = 'play_arrow';
}
});

// 오디오 진행 업데이트
audio.addEventListener('timeupdate', () => {
if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = progressPercent + '%';
    currentTimeElem.textContent = formatTime(audio.currentTime);
}
});

// 메타데이터 로드 후 전체 재생 시간 표시
audio.addEventListener('loadedmetadata', () => {
    durationElem.textContent = formatTime(audio.duration);
});

// 진행바 클릭 시 재생 위치 이동
progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * audio.duration;
    audio.currentTime = newTime;
});

// 시간을 mm:ss 형식으로 포맷하는 함수
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return `${minutes}:${seconds}`;
}



async function sendRequest(value) {
    try{
        const response = await fetch('../json/books.json');  // JSON 파일 경로
        const books = await response.json();  // JSON 데이터 파싱
        const book = books.find(item => item.isbn13 === value);
        const fileName = book.CONTENT;
        if (!fileName) {
            alert("내용을 입력하세요.");
            return;
        }
        fetch("http://116.126.12.88:8000/process", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
            INPUT_TEXT: fileName
        })
        })
        .then(response => {
            if (!response.ok) throw new Error("서버 응답 오류");
            return response.blob();
        })
        .then(blob => playAudio(blob))
        .catch(error => console.error("Fetch 오류:", error));
    }catch (error) {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
      }
}