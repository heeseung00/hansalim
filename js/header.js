window.addEventListener("load", function () {
  const wrap = this.document.querySelector(".wrap");
  const header = this.document.querySelector(".header");
  let scy = 0;
  this.window.addEventListener("scroll", function () {
    scy = this.document.documentElement.scrollTop;
    // console.log(scy);
    if (scy > 0) {
      wrap.classList.add("active");
      header.classList.add("active");
    } else {
      wrap.classList.remove("active");
      header.classList.remove("active");
    }
  });
  //   펼침 목록들 보기 기능
  // 더보기 목록기능
  const menuBt = document.getElementById("menu-bt");
  const menuList = document.getElementById("menu-list");
  // 참여 목록기능
  const joinBt = document.getElementById("join-bt");
  const joinList = document.getElementById("join-list");
  //  조합원센터 목록기능
  const centerBt = document.getElementById("center-bt");
  const centerList = document.getElementById("center-list");
  // 배열 순서번호가 주어진다.(배열순서번호 index)

  const toggleListArr = [menuList, joinList, centerList];
  const toggleBtArr = [menuBt, joinBt, centerBt];
  // 펼침 목록 모두 닫기
  this.document.addEventListener("click", function () {
    toggleListArr.forEach(function (item) {
      item.style.display = "none";
    });
    // 버튼 초기화
    toggleBtArr.forEach(function (item) {
      item.classList.remove("active");
    });
  });
  // 목록전체를 클릭해도 이벤트 전달을 막아줌
  toggleListArr.forEach(function (item) {
    item.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });
  // 코드 블럭이 같은 기능을 반복된다
  // 기능을 만들어서 쓴다
  function listToggle(bt, list) {
    // 처음에는 목록을 보여주기 않는다.
    list.style.display = "none";
    // 클릭이벤드가 발생하면 함수 실행
    bt.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleBtArr.forEach(function (item) {
        item.classList.remove("active");
      });
      console.log(list);
      const nowListId = list.getAttribute("id");
      const hideArr = toggleListArr.filter(function (item) {
        let id = item.getAttribute("id");
        // console.log(id);
        if (id !== nowListId) {
          return this;
        }
      });
      // 새로 저장된 배열의 목록
      console.log(hideArr);
      hideArr.forEach(function (item) {
        item.style.display = "none";
      });
      const css = getComputedStyle(list).display;
      // display값 비교한다.
      if (css === "none") {
        list.style.display = "block";
        // 클래스를 강제로 추가한다.
        bt.classList.add("active");
      } else {
        list.style.display = "none";
        // 클래스를 강제로 추가한다.
        bt.classList.remove("active");
      }
    });
  }
  listToggle(menuBt, menuList);
  // toggleListArr[0] = menuList
  listToggle(joinBt, joinList);
  // toggleListArr[1] = joinList
  listToggle(centerBt, centerList);
  // toggleListArr[2] = centerList
  // ====================================================
  // 전체 메뉴 펼침 기능
  const allMenuArea = document.querySelector(".all-menu-area");
  const allMenu = document.querySelector(".all-menu");
  const cateList = document.querySelector(".cate-list");
  // ul인 cate-list로 선언하니 스크롤 부분에 커서올리면 메뉴 사라짐.
  const cateListWrap = document.querySelector(".all-menu-cate-wrap");
  const deliList = this.document.querySelector(".deli-list");
  const themeList = this.document.querySelector(".theme-list");
  let isMenuOpen = false;
  cateList.addEventListener("mouseleave", function () {
    if (!isMenuOpen) {
      allMenu.classList.remove("active"); // 기능되기 전 가림.
    }
  });
  cateList.addEventListener("mouseenter", function () {
    allMenu.classList.add("active");
  });
  cateListWrap.addEventListener("mouseenter", function () {
    allMenu.classList.add("active");
  });
  deliList.addEventListener("mouseenter", function () {
    allMenu.classList.remove("active");
  });
  themeList.addEventListener("mouseenter", function () {
    allMenu.classList.remove("active");
  });
  // 서브 카테고리 보여주기 기능
  const cateLists = this.document.querySelectorAll(".cate-list > li");
  const cateDepth2 = this.document.querySelectorAll(".cate-depth2-list");
  cateLists.forEach(function (item, index) {
    // console.log(item);
    item.addEventListener("mouseenter", function () {
      cateDepth2.forEach(function (itemSub, indexSub) {
        // console.log(itemSub);
        itemSub.style.display = "none";
        if (indexSub === index) {
          itemSub.style.display = "block";
        }
      });
    });
  });

  // =88888888888888888888888888888888888
});
