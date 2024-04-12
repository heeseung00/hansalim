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
      NEW_GOOD = obj.newgood;
      RECOMMEND_GOOD = obj.recommendgood;
      POPULAR_ICON = obj.popularicon;
      POPULAR_GOOD = obj.populargood;
      showVisual(); //비주얼을 화면에 배치
      showTodayGood(); //오늘의 물품을 화면에 배치
      showSaleGood(); //알뜰 물품을 화면에 배치
      showNewGood(); //새물품을 화면에 배치
      showRecommendGood(); //추천 물품을 화면에 배치
      showPopularIcon(); //인기 물품 아이콘을 화면에 배치
      showPopularGood(); //인기 물품목록을 화면에 배치
    }
  };
  //   자료 호출한다.
  xhttp.open("GET", "data.json");
  // 웹브라우저 기능 실행 할수 있도록 요청
  xhttp.send();
  // 비주얼 슬라이드
  let VISUAL_ARR;
  let visualTag = this.document.getElementById("data-visual");
  // 오늘이 물품
  let TODAY_GOOD;
  let todayTag = this.document.getElementById("data-today");
  let todayTag2 = this.document.getElementById("data-today2");
  // 알뜰물품
  let SALE_GOOD;
  let saleTag = this.document.getElementById("data-sale");
  // 새물품
  let NEW_GOOD;
  let newTag = this.document.getElementById("data-new");
  let newListTag = this.document.getElementById("data-new-list");
  // 추천물품
  let RECOMMEND_GOOD;
  let recommendTag = this.document.getElementById("data-recommend");
  // 인기물품 아이콘
  let POPULAR_ICON;
  let popularIconTag = this.document.getElementById("data-popular-icon");
  // 인기물품 목록
  let POPULAR_GOOD;
  let popularShow = 1; //목록 중에 먼저 1번을 보여줌
  let popularGoodTag = this.document.getElementById("data-popular");
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
    //   비주얼 슬라이드 기능
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
    const swVisualPlay = document.querySelector(".visual-play");
    swVisualPlay.addEventListener("click", function () {
      // 현재 active 클래스가 있는지를 확인하고 기능을 설정
      // 만약에 classList에 contains가 active라면
      if (swVisualPlay.classList.contains("active")) {
        swVisual.autoplay.start(); //사진이 멈춰야 하므로 swVisual
        swVisualPlay.classList.remove("active");
      } else {
        swVisual.autoplay.stop();
        swVisualPlay.classList.add("active");
      }
    });
  }
  // =====================오늘의 물품 =============================
  // 오늘의 물품 화면출력 기능
  function showTodayGood() {
    let htmlTop = "";
    let htmlBottom = "";
    // 윗부분 index 0 ~ 3
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
    // 아랫부분 index 4~ 7 배열 만들기
    const botArr = TODAY_GOOD.filter(function (item, index) {
      if (index > 3) {
        return item;
      }
    });
    botArr.forEach(function (item) {
      let tag = `<div class="good-box">
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
</div>`;
      htmlBottom += tag;
    });
    todayTag.innerHTML = htmlTop;
    todayTag2.innerHTML = htmlBottom;
  }
  // =====================오늘의 물품 =============================
  // =====================알뜰 물품 =============================
  function showSaleGood() {
    let html = `
  <div class="swiper sw-sale">
  <div class="swiper-wrapper">
  `;
    SALE_GOOD.forEach(function (item) {
      let tag = `
<div class= "swiper-slide">
<div class="good-box">
<!-- 제품이미지 -->
<a href="${item.link}" class="good-img">
    <img src="images/${item.pic}" alt="${item.name}">
    <span class="good-type">${item.tag}</span>
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
</div>
`;
      html += tag;
    });
    html += `
    </div>
  </div>`;
    saleTag.innerHTML = html;
    const swSale = new Swiper(".sw-sale", {
      slidesPerView: 3, // 보여지는 슬라이드 개수
      spaceBetween: 16, // 슬라이드 간의 간격
      slidesPerGroup: 3, // 넘어가는 슬라이드 개수
      navigation: {
        prevEl: ".sale .slide-prev",
        nextEl: ".sale .slide-next",
      },
      pagination: {
        // 페이지 수 출력됨.
        el: ".sale .slide-pg",
        type: "fraction", // type을 하지 않으면 점으로 나옴.
      },
    });
  }
  // =====================새 물품 =============================
  function showNewGood() {
    // 첫번째 화면출력(왼쪽)
    let obj = NEW_GOOD[0]; //obj라는 변수를 0번째로 선언하고 불러옴
    let newGoodFirst = `
  <a href="${obj.link}" class="new-img">
  <img src="images/${obj.pic}" alt="${obj.title}"/>
</a>
<a href="${obj.link}" class="new-title">
  ${obj.title}
</a>
<a href="${obj.link}" class="new-txt">
  ${obj.txt}
</a>
  `;
    newTag.innerHTML = newGoodFirst;
    // 두번번째 화면출력(오른쪽)나머지 1~4
    let html = "";
    NEW_GOOD.forEach(function (item, index) {
      // console.log(item);
      let tag = "";
      if (index !== 0) {
        tag = `
      <div class="new-box">
      <a href="${item.link}" class="new-box-img">
          <img src="images/${item.pic}" alt="${item.title}"/>
      </a>
      <a href="${item.link}" class="new-box-title">
          ${item.title}
      </a>
  </div>
      `;
      }
      html += tag;
    });
    newListTag.innerHTML = html;
  }

  // =====================추천 물품 =============================
  function showRecommendGood() {
    let html = `
  <div class="swiper sw-recommend">
  <div class="swiper-wrapper">
  `;
    RECOMMEND_GOOD.forEach(function (item) {
      let tag = `
<div class= "swiper-slide">
<div class="good-box">
<!-- 제품이미지 -->
<a href="${item.link}" class="good-img">
    <img src="images/${item.pic}" alt="${item.name}">
    <span class="good-type">${item.tag}</span>
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
</div>
`;
      html += tag;
    });
    html += `
    </div>
  </div>`;
    recommendTag.innerHTML = html;
    const swRecommend = new Swiper(".sw-recommend", {
      slidesPerView: 3, // 보여지는 슬라이드 개수
      spaceBetween: 16, // 슬라이드 간의 간격
      slidesPerGroup: 3, // 넘어가는 슬라이드 개수
      navigation: {
        prevEl: ".recommend .slide-prev",
        nextEl: ".recommend .slide-next",
      },
      pagination: {
        // 페이지 수 출력됨.
        el: ".recommend .slide-pg",
        type: "fraction", // type을 하지 않으면 점으로 나옴.
      },
    });
  }
  // 인기물품
  // 인기 물품 아이콘 화면 출력

  function showPopularIcon() {
    let html = `
<div class = "swiper sw-icon">
<div class = "swiper-wrapper">

`;
    // 데이터처리
    POPULAR_ICON.forEach(function (item) {
      const tag = `
<div class = "swiper-slide">
<a href = "${item.link}">
    <span class = "popular-cate-icon"
    style = "
    background : url('images/${item.icon}') no-repeat;
    background-position : 0px 0px;">
    </span>
    <span class = "popular-cate-name">${item.txt}</span>
</a>
</div>
`; //hover 시 변경을 위해 여기서 style적용해줌
      html += tag;
    });
    html += `
</div>
</div>
`;
    popularIconTag.innerHTML = html;
    const swIcon = new Swiper(".sw-icon", {
      slidesPerView: 7, // 보여지는 슬라이드 개수
      spaceBetween: 10, // 슬라이드 간의 간격
      slidesPerGroup: 7, // 넘어가는 슬라이드 개수
      navigation: {
        prevEl: ".popular-cate .popular-slide-prev",
        nextEl: ".popular-cate .popular-slide-next",
      },
    });
    const tag = document.querySelectorAll(".popular-slide a");
    tag.forEach(function (item, index) {
      // console.log(index,item);
      // 호버했을때 이미지 변경
      item.addEventListener("mouseover", function () {
        const spanTag = this.querySelector(".popular-cate-icon");
        spanTag.style.backgroundPositionY = "-64px";
      });
      item.addEventListener("mouseleave", function () {
        const spanTag = this.querySelector(".popular-cate-icon");
        spanTag.style.backgroundPositionY = "0";
      });
    });
  }
  //  888888888888888888888888888888888888888888888888888
});
