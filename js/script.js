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
      BRAND_ARR = obj.brandarr;
      BANNER_ARR = obj.bannerarr;
      SEASON_GOOD = obj.seasongood;
      REVIEW_ARR = obj.review;
      NOTICE_ARR = obj.notice;
      GOODNEWS_ARR = obj.goodnews;
      showVisual(); //비주얼을 화면에 배치
      showTodayGood(); //오늘의 물품을 화면에 배치
      showSaleGood(); //알뜰 물품을 화면에 배치
      showNewGood(); //새물품을 화면에 배치
      showRecommendGood(); //추천 물품을 화면에 배치
      showPopularIcon(); //인기 물품 아이콘을 화면에 배치
      showPopularGood(); //인기 물품목록을 화면에 배치
      showBrandArr(); //브랜드관을 화면에 배치
      showBannerArr(); //배너를 화면에 배치
      showSeasonGood(); //제철요리를 화면에 배치
      showReview(); //리뷰를 화면에 배치
      showNotice(); //공지사항을 화면에 배치
      showGoogNews(); //물품소식을 화면에 배치
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
  // 브랜드관
  let BRAND_ARR;
  let brandTag = this.document.getElementById("data-brand");
  // 배너
  let BANNER_ARR;
  let bannerTag = this.document.getElementById("data-banner");
  // 제철요리
  let SEASON_GOOD;
  let seasonTag = this.document.getElementById("data-season");
  // 리뷰 화면 출력
  let REVIEW_ARR;
  let reviewTag = this.document.getElementById("data-review");
  // 공지사항
  let NOTICE_ARR;
  let noticeTag = this.document.getElementById("data-notice");

  // 물품소식
  let GOODNEWS_ARR;
  let goodNewsTag = this.document.getElementById("data-goodnews");
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
      // 아이콘에 클릭하면 버튼 (.popular-more)의 글자를
      // 클릭된 타이틀의 글자로 변경
      // console.log(item);

      item.addEventListener("click", function (event) {
        event.preventDefault();

        const bt = document.querySelector(".popular-more");
        const title = this.querySelector(".popular-cate-name");
        // console.log(title);
        bt.innerHTML = `${title.innerHTML} 물품 더보기`;
        // 클릭된 아이콘에 테두리 제거
        tag.forEach(function (item) {
          item.style.border = "none";
        });
        this.style.backgroundColor = "#fff";
        this.style.border = "2px solid #76bd42";

        //  아이콘을 클릭했을때 해당 목록이 보여지는 코드
        popularShow = index;
        //위에 선언한 1이 index 임을 선언.
        showPopularGood();
      });
    });
  }
  // 인기물품 목록 화면출력
  function showPopularGood() {
    let html = "";
    let popCate = "populargood-" + (popularShow + 1); //인덱스 번호에 계속 +1을 함
    // console.log(POPULAR_GOOD[popCate]);
    POPULAR_GOOD[popCate].forEach(function (item) {
      // 여러개이므로 foreach
      let tag = `
<div class="good-box">
<!-- 제품이미지 -->
<a href="${item.link}" class="good-img">
    <img src="images/${item.pic}" alt="${item.name}" />
    <span class="good-type">${item.tag}</span>
</a>
<!-- 제품정보 -->
<a href="${item.link}" class="good-info">
    <em>${item.name}</em>(<em>${item.unit}</em>)
</a>
<!-- 제품가격 -->
<a href="${item.link}" class="good-info-price">${priceToString(item.price)}<em>원</em></a>
<!-- 장바구니 -->
<button class="good-add-cart"></button>
</div>
`;
      html += tag;
      popularGoodTag.innerHTML = html;
    });
  }
  // 브랜드관 화면출력
  function showBrandArr() {
    let html = `
      <div class="swiper sw-brand">
      <div class="swiper-wrapper">
      `;
    BRAND_ARR.forEach(function (item) {
      let tag = `
          <div class="swiper-slide">
              <div class="brand-box">
                  <a href="${item.link}">
                      <img src="images/${item.pic}" alt="${item.name}"/>
                      <p>${item.name}</p>
                      <ul class="brand-info clearfix">
                          <li>
                              <span class="brand-info-title">${item.title1}</span>
                              <span class="brand-info-value">${item.value1}</span>
                          </li>
                          <li>
                              <span class="brand-info-title">${item.title2}</span>
                              <span class="brand-info-value">${item.value2}</span>
                          </li>
                      </ul>
                  </a>
              </div>
          </div>
          `;
      html += tag;
    });
    html += `
      </div>
      </div>
      `;
    brandTag.innerHTML = html;
    const swBrand = new Swiper(".sw-brand", {
      slidesPerView: 3, // 보여지는 슬라이드 개수
      spaceBetween: 16, // 슬라이드 간의 간격
      slidesPerGroup: 1, // 넘어가는 슬라이드 개수
      navigation: {
        prevEl: ".brand .slide-prev",
        nextEl: ".brand .slide-next",
      },
      pagination: {
        el: ".brand .slide-pg",
        type: "fraction",
      },
    });
  }
  // 배너 화면출력
  function showBannerArr() {
    let html = `
  <div class = "swiper sw-banner">
  <div class = "swiper-wrapper">
  `;
    BANNER_ARR.forEach(function (item) {
      let tag = `
<div class="swiper-slide">
            <a href="${item.link}">
                <img src = "images/${item.image}" alt ="${item.title}"/>
            </a>
        </div>
`;
      html += tag;
    });

    html += `
  </div>
  </div>
  `;
    bannerTag.innerHTML = html;
    const swBanner = new Swiper(".sw-banner", {
      loop: true,
      autoplay: {
        delay: 2500,
      },
      slidesPerView: 2,
      spaceBetween: 0,
      navigation: {
        prevEl: ".banner .slide-prev",
        nextEl: ".banner .slide-next",
      },
    });
  }
  // 제철요리 화면 출력
  function showSeasonGood(item, index) {
    let html = "";
    SEASON_GOOD.forEach(function (item, index) {
      const tag = `
<li>
<div class="season-good clearfix">
    <input
        type="checkbox"
        id="ch${index}"
        class="season-good-check season-item"
        value="${item.price}"
     
    />
    <label for="ch${index}" class="season-label"></label>
    <a href="${item.link}" class="season-good-img">
        <img src="images/${item.pic}" alt="${item.title}"/>
    </a>
    <p class= "season-good-info">
        <a href="${item.link}" class="season-good-title">${item.title}</a>
        <a href="${item.link}" class="season-good-price">
            <em>${priceToString(item.price)}</em>원
        </a>
    </p>
</div>
</li>

`;
      html += tag;
    });
    seasonTag.innerHTML = html;

    Scrollbar.initAll(); // smooth scrollbar 적용
    checkBoxFn();
    showBuyGood();
  }
  // 제철요리목록 전체 체크박스 기능
  const buyTotal = this.document.getElementById("buy-total"); //총 갯수
  const buyTotalMoney = this.document.getElementById("buy-total-money");
  let buyTotalCount = 0; // 기본값
  let buyTotalMoneyPrice = 0; //기본값
  // 전체 체크박스 기능
  const chkAll = this.document.getElementById("chkall");
  chkAll.addEventListener("change", function () {
    const chkArr = document.querySelectorAll(".season-item");
    if (chkAll.checked) {
      // 전체 체크를 해야 하는 경우
      chkArr.forEach(function (item) {
        item.checked = true;
      });
    } else {
      // 전체 체크를 해제해야 하는 경우
      chkArr.forEach(function (item) {
        item.checked = false;
      });
    }
    showBuyGood();
  });
  //체크박스 가각의 기능
  function checkBoxFn() {
    const chkArr = document.querySelectorAll(".season-item");
    chkArr.forEach(function (item) {
      item.addEventListener("change", function () {
        // 가격을 다시 계산한다
        showBuyGood();
      });
    });
  }
  // 계산출력하는 기능 함수
  function showBuyGood() {
    // 체크가 된 값을 카운팅하고 더한다.
    let count = 0; //체크된 상품의 수를 저장할 변수
    let priceTotal = 0; // 체크된 상품들의 총 가격을 저장할 변수
    // 모든 체크박스 요소를 가져와서 배열레 저장
    const chkArr = document.querySelectorAll(".season-item");
    chkArr.forEach(function (item) {
      const state = item.checked; //현재 체크박스이 체크상태를 확인
      // console.log(state);
      if (state) {
        //체크가 되어있다면
        count += 1; //체크된 상품의 수를 증가 count++
        const price = parseInt(item.value); //체크된 상품의 가격을 정수로 변화하여 가져옴
        priceTotal += price;
      }
    });
    buyTotalCount = count; //체크된 상품의 수를 전역변수에 저장
    buyTotalMoneyPrice = priceTotal; //총가격을 전역변수에 저장
    buyTotal.innerHTML = buyTotalCount;
    buyTotalMoney.innerHTML = priceToString(buyTotalMoneyPrice);
    // 전체 선택 버튼 해제
    if (buyTotalCount === chkArr.length) {
      //모든 상품의 체크가 되었다면
      chkAll.checked = true; //전체 선택 버튼도 체크 상태로 변경
    } else {
      chkAll.checked = false; //전체 선택 버튼도 해제 상태로 변경
    }
  }

  // 리뷰 화면 출력
  function showReview() {
    let html = `
    <div class="swiper sw-review">
    <div class="swiper-wrapper">
    `;
    // 데이터처리
    REVIEW_ARR.forEach(function (item) {
      // console.log(item);
      const tag = `
<div class="swiper-slide">
<div class="review-box">
    <a href="${item.link}">
        <div class= "review-box-desc">
            <span class= " review-box-title">
                ${item.title}
            </span>
            <span class="review-box-star"> ${item.star} </span>
            <span class="review-box-img">
                <img src="images/${item.pic}" alt="${item.title}"/>
            </span>
        </div>
        <p class="review-box-txt">
            ${item.txt}
        </p>
        <span class="review-box-user">${item.user} (${item.shop})</span>
    </a>
</div>
</div>
`;
      html += tag;
    });

    html += `
    </div>
    </div>
    `;
    reviewTag.innerHTML = html;
    const swReview = new Swiper(".sw-review", {
      slidesPerView: 3,
      spaceBetween: 16,
      slidesPerGroup: 3,
      navigation: {
        prevEl: ".review .slide-prev",
        nextEl: ".review .slide-next",
      },
      pagination: {
        el: ".review .slide-pg",
        type: "fraction",
      },
    });
  }
  //공지사항을 화면에 배치
  function showNotice() {
    let html = "";
    // 데이터를 갱신
    NOTICE_ARR.forEach(function (item) {
      // console.log(item);
      const tag = `
<li>
            <a href="${item.link}">
                <span>
                    ${item.title}
                </span><em>${item.date}</em>
            </a>
        </li>
`;
      html += tag;
    });
    noticeTag.innerHTML = html;
  }
  //물품소식을 화면에 배치
  function showGoogNews() {
    let html = "";
    // 데이터를 갱신
    GOODNEWS_ARR.forEach(function (item) {
      // console.log(item);
      const tag = `
<li>
            <a href="${item.link}">
                <span>
                    ${item.title}
                </span><em>${item.date}</em>
            </a>
        </li>
`;
      html += tag;
    });
    goodNewsTag.innerHTML = html;
  }
  // 커뮤니티 탭메뉴
  // 탭버튼
  const tabBtArr = this.document.querySelectorAll(".community-bt")
  // 탭내용
  const tabConArr= this.document.querySelectorAll(".community-notice dd")
  // 탭포커스
  let tabFocusIndex = 0;
  // 탭 버튼 클릭처리 기능
  tabBtArr.forEach(function(item, index){
    // console.log(item, index);
    item.addEventListener("click",function(){
      // console.log(item ,index);
      tabFocusIndex = index;
      
      tabFocusFn()
    })
  })
  // 탭포커스가 클릭됐을때 보여지는 함수 생성
  function tabFocusFn(){
    tabBtArr.forEach(function(item){
      item.classList.remove("community-bt-active")
    })
    // 인덱스에 해당하는 것만 적용
    tabBtArr[tabFocusIndex].classList.add("community-bt-active")
    // 아에 없다가 클릭했을대 생성되게 함
    // 내용도 일단 모두 제거한다.
    tabConArr.forEach(function(item){
      // console.log(item);
      item.classList.remove("community-visible-active") 

    })
    tabConArr[tabFocusIndex].classList.add("community-visible-active")
  }
  //  888888888888888888888888888888888888888888888888888
});
