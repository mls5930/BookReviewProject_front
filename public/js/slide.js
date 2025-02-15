   // hidden 요소에서 items 데이터를 가져와 파싱합니다.
   const dataHolder = document.getElementById("dataHolder");
   const items = JSON.parse(dataHolder.textContent);

   const slideContainer = document.getElementById("slideContainer");
   const prevBtn = document.getElementById("prevBtn");
   const nextBtn = document.getElementById("nextBtn");

   let currentIndex = 0;
   const totalItems = items.length;
   const visibleCount = 4; // 한 화면에 보여줄 아이템 수


   // 슬라이드 영역에 visibleCount 개의 아이템을 렌더링하는 함수
   const renderSlides = () => {
       slideContainer.innerHTML = "";
       for (let i = 0; i < visibleCount; i++) {
           const index = (currentIndex + i) % totalItems;
           const item = items[index];
           
           const itemDiv = document.createElement("div");
           const itemText = document.createElement("div");
           const itemAuthor = document.createElement("div");
           
           itemDiv.className = "item";
           itemDiv.innerHTML = `<a href="/bookview/${item.isbn13}"> 
                   <img src="${item.cover}" alt="이미지 없음 ㅠ">
               </a>`;
           itemText.innerHTML =`${item.title}`;
           itemAuthor.innerHTML =`${item.author}`;
           
           slideContainer.appendChild(itemDiv);
           itemDiv.append(itemText);
           itemText.append(itemAuthor);

       }
   };

   slideContainer.classList.add("slideContainer");
   renderSlides();

   prevBtn.addEventListener("click", (e) => {
       e.stopImmediatePropagation();
       currentIndex = (currentIndex - 1 + totalItems) % totalItems;
       renderSlides();
   });

   nextBtn.addEventListener("click", (e) => {
       e.stopImmediatePropagation();
       currentIndex = (currentIndex + 1) % totalItems;
       renderSlides();
   });

   setInterval(() => {
       currentIndex = (currentIndex + 1) % totalItems;
       renderSlides();
   }, 5000);