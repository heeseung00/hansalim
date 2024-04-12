window.addEventListener("load", function () {
  // 콤마 기능
  function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // data.json을 로딩, 연결시킨다.
  const xhttp = new XMLHttpRequest();
  // console.log(xhttp);
  xhttp.onreadystatechange = function (e) {
    const req = e.target;
    // console.log(req);
    if (req.readyState === XMLHttpRequest.DONE) {
      const str = req.response;
      // 글자로 온 데이터를 객체로 변환
      // 글자가 json 규칙대로 만들어진 문자열
      // 그러므로 json글자를 객체로 변환해서 활용한다.
      let obj = JSON.parse(str);

      VISUAL_ARR = obj.visual;
      TODAY_GOOD = obj.todaygood;
      SALE_GOOD = obj.salegood;
      RECOMMEND_GOOD = obj.recommendgood;

      showVisual(); //비주얼을 화면에 배치
      showTodayGood(); //오늘의 물품을 화면에 배치
      showSaleGood(); //알뜰 물품을 화면에 배치
      showRecommedGood(); //추천상품 화면에 배치
    }
  };

  // 💡스와이퍼 xhttp로 자료 호출.
  xhttp.open("GET", "data.json");
  // 웹브라우저 기능 실행 할수 있도록 요청
  xhttp.send();
  // 비주얼 슬라이드
  let VISUAL_ARR;
  let visualTag = this.document.getElementById("data-visual");
  // 오늘의 물품
  let TODAY_GOOD;
  let todayTag = this.document.getElementById("data-today");
  let todayTag2 = this.document.getElementById("data-today2");
  // 비주얼 화면 출력 기능
  function showVisual() {
    let html = "";
    VISUAL_ARR.forEach(function (item) {
      const tag = `
       <div class="swiper-slide">
               <div class="visual-slide-page">
                 <a href="${item.link}">
                   <img src="images/${item.pic}" alt="${item.name}" />
                 </a>
               </div>
             </div>
       `;
      // json의 변수를 가져와서 item으로 선언
      html += tag;
    });
    visualTag.innerHTML = html;

    // 비주얼 슬라이드기능
    const swVisual = new Swiper(".sw-visual", {
      loop: true, // loop : 무한으로 도는 것.
      autoplay: {
        delay: 2500,
        disableOnInteraction: false, // 상관없이 계속 autoplay.
      },
      navigation: {
        prevEl: ".visual-prev",
        nextEl: ".visual-next",
      },
      pagination: {
        // 하나하나 넘어가는 것.
        el: ".visual-pg",
        type: "fraction",
      },
    });

    // 비주얼 슬라이드 멈춤 기능
    const showVisualPlay = document.querySelector(".visual-play");
    showVisualPlay.addEventListener("click", function () {
      // 현재 active 클래스가 있는지를 확인하고 기능을 설정
      // 만약에 classList에 contains가 active하면
      if (showVisualPlay.classList.contains("active")) {
        swVisual.autoplay.start();
        showVisualPlay.classList.remove("active");
      } else {
        swVisual.autoplay.stop();
        showVisualPlay.classList.add("active");
      }
    });
  }

  //   ====================== 오늘의 물품 ======================
  //   오늘의 물품 화면 출력 기능
  function showTodayGood() {
    let htmlTop = "";
    let htmlBottom = "";
    const topArr = TODAY_GOOD.filter(function (item, index) {
      if (index < 4) {
        return item;
      }
    });
    topArr.forEach(function (item) {
      let tag = `
        <div class="good-box">
            <!-- 제품이미지 -->
            <a href="${item.link}" class="good-img">
                <img src="images/${item.pic}" alt="${item.name}">
            </a>
            <!-- 제품정보 -->
            <a href="${item.link}" class="good-info">
                <em>${item.name}</em>(<em>${item.unit}</em>)
            </a>
            <!-- 제품가격 -->
            <a href="${item.link}" class="good-info-price">
            ${priceToString(item.price)}<em>원</em>
            </a>
            <!-- 장바구니 이미지 -->
            <button class="good-add-cart"></button>
        </div>
        `;

      htmlTop += tag;
    });
    const botArr = TODAY_GOOD.filter(function (item, index) {
      if (index > 3) {
        return item;
      }
    });
    botArr.forEach(function (item) {
      let tag = `
        <div class="good-box">
        <!-- 제품이미지 -->
        <a href="${item.link}" class="good-img">
            <img src="images/${item.pic}" alt="${item.name}">
        </a>
        <!-- 제품정보 -->
        <a href="${item.link}" class="good-info">
            <em>${item.name}</em>(<em>${item.unit}</em>)
        </a>
        <!-- 제품가격 -->
        <a href="${item.link}" class="good-info-price">
        ${priceToString(item.price)}<em>원</em>
        </a>
        <!-- 장바구니 이미지 -->
        <button class="good-add-cart"></button>
    </div>
        `;
      let htmlBottom = "";
    });
    todayTag.innerHTML = htmlTop;
  }
  //   ====================== 오늘의 물품 ======================
  //   ====================== 알뜰 물품 ======================
  function showSaleGood() {
    let html = `
    <div class="swiper sw-sale">
    <div class="swiper-wrapper">
    `;
    html += ` </div>
    </div>
    `;
    saleTag.innerHTML = html;
    // const swSale =
  }

  //   ====================== 추천 상품 ======================
  function showRecommedGood() {}
});
