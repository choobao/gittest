import config from "./apiKey.js";

// ============================================================ //
// 전역 변수
// ============================================================ //

const API_KEY = config.API_KEY;

// ============================================================ //
// 렌더링
// ============================================================ //

// 영화 디테일 카드 만들기
const createDetailCard = (movie, container) => {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  img.alt = `${movie.title} Poster`;
  img.className = "img";

  const title = document.createElement("h4");
  title.className = "title";
  title.textContent = movie.title;

  const overview = document.createElement("p");
  overview.className = "overview";
  overview.textContent = movie.overview;

  const voteAvg = document.createElement("small");
  voteAvg.className = "voteAvg";
  voteAvg.textContent = `Rating: ${movie.vote_average}`;

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(overview);
  card.appendChild(voteAvg);

  container.appendChild(card);
};

// 리뷰 카드 만들기
const createReviewCard = (review, container) => {
  const reviewCard = document.createElement("div");
  reviewCard.className = "reviewCard";

  const reviewUserName = document.createElement("p");
  reviewUserName.className = "reviewUserName";
  reviewUserName.textContent = review.userName;

  const reviewContent = document.createElement("p");
  reviewContent.className = "reviewContent";
  reviewContent.textContent = review.userReview;

  // 수정 버튼
  // 삭제 버튼

  reviewCard.appendChild(reviewUserName);
  reviewCard.appendChild(reviewContent);

  container.appendChild(reviewCard);
};

// ============================================================ //
// 이벤트
// ============================================================ //

// url에서 id(movieId) 가져오기
const getMovieId = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");
  return movieId;
};

// 영화 디테일 불러오기
const fetchMovieDetails = async () => {
  const $movieDetailContainer = document.querySelector("#movie-details");

  // url에서 id 가져오기
  const movieId = getMovieId();

  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
    const movie = await res.json();
    createDetailCard(movie, $movieDetailContainer);
  } catch (err) {
    console.error("Error fetching data: ", err);
    $movieDetailContainer.textContent = "ERROR FETCHING DATA";
  }
};

// 그 영화에 대한 리뷰 리스트 보여주기
const displayReviewList = () => {
  const $reviewContainer = document.querySelector("#review-container");
  $reviewContainer.innerHTML = ""; // 안의 내용 지우기

  const movieId = getMovieId();
  console.log(movieId);

  const reviewList = JSON.parse(localStorage.getItem(movieId));
  console.log(reviewList);

  if (reviewList === null) {
    $reviewContainer.textContent = "NO REVIEWS YET";
    return;
  }

  reviewList.forEach((review) => {
    createReviewCard(review, $reviewContainer);
  });
};

// 저장 버튼을 누르면 -> 그 영화에 대한 리뷰 저장하기
const saveReview = (event) => {
  event.preventDefault();
  const userName = document.getElementById("userName").value;
  const userPassword = document.getElementById("userPassword").value;
  const userReview = document.getElementById("userReview").value;

  // 유효성 검사 -> 입력 안했거나, 공백이거나
  if (userName === null || userName.trim() === "") {
    alert("잘못된 닉네임 입력입니다.");
    return;
  }
  if (userReview === null || userReview.trim() === "") {
    alert("리뷰가 입력되지 않았습니다.");
    return;
  }
  if (userPassword === null || userPassword.trim() === "") {
    alert("잘못된 비밀번호 입력입니다.");
    return;
  }

  const movieId = getMovieId(); // string
  // localStorage의 key : 영화 아이디(문자열), value = 객체들로 이루어진 배열(문자열)
  // 만약 키에 해당하는 값이 존재하지 않으면 null이 반환된다.
  if (localStorage.getItem(movieId) === null) {
    let tmp = [{ userName, userPassword, userReview }];
    localStorage.setItem(movieId, JSON.stringify(tmp)); // localStorage의 키, 값은 문자열이다.
  } else {
    const reviewList = JSON.parse(localStorage.getItem(movieId));
    reviewList.push({ userName, userPassword, userReview });
    localStorage.setItem(movieId, JSON.stringify(reviewList));
  }

  // 화면 새로고침
  window.location.reload();
  // 리뷰 리스트 다시 보여주기
  displayReviewList();
};

// init 함수 -> DOM TREE 로드되면 할 작업
const init = async () => {
  fetchMovieDetails(); // 영화 디테일 보여주기
  displayReviewList(); // 그 영화에 대한 리뷰들 보여주기
};

// ============================================================ //
// 함수 진입점
// ============================================================ //

// 로드가 완료되면 전체 함수 진입
document.addEventListener("DOMContentLoaded", async function () {
  // 저장 버튼 클릭하면 리뷰 저장
  document.getElementById("saveReviewBtn").addEventListener("click", saveReview);
  await init();
});
