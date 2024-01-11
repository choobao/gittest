//localStorage에 키 밸류 저장
const userNickName = document.getElementById("nickName");
const userPassWord = document.getElementById("passWord");
const userSubmit = document.getElementById("submit");
const userReview = document.getElementById("review");

userSubmit.addEventListener("click", () => {
  // 기존 사용자 정보 가져오기
  let usersInfo = JSON.parse(localStorage.getItem("usersInfo")) || [];

  // 새로운 사용자 정보 추가
  let newUserInfo = {
    nickname: userNickName.value,
    passWord: userPassWord.value,
    review: userReview.value,
  };

  // 기존 사용자 정보에 새로운 사용자 정보 추가
  usersInfo.push(newUserInfo);

  //사용자 정보 문자열로 변환
  localStorage.setItem("usersInfo", JSON.stringify(usersInfo));

  //새로고침
  location.reload();
});
//form태그로 인한 새로고침을 막고 alert창 띄우기
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("리뷰가 작성되었습니다.");
});
