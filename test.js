import { options } from "./apikey.js";
const url =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

fetch(url, options)
  .then((response) => response.json())
  .then((data) => {
    const movieId = data.results.map((movie) => movie.id);

    const userNickName = document.getElementById("nickName");
    const userPassWord = document.getElementById("passWord");
    const userSubmit = document.getElementById("submit");
    const userReview = document.getElementById("review");

    userSubmit.addEventListener("click", () => {
      const firstMovieId = movieId[0];

      let usersInfo =
        JSON.parse(localStorage.getItem(`usersInfo-${firstMovieId}`)) || [];

      let newUserInfo = {
        nickname: userNickName.value,
        passWord: userPassWord.value,
        review: userReview.value,
      };

      usersInfo.push(newUserInfo);

      localStorage.setItem(
        `usersInfo-${firstMovieId}`,
        JSON.stringify(usersInfo)
      );

      location.reload();
    });
  });

//form태그로 인한 새로고침을 막고 alert창 띄우기
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("리뷰가 작성되었습니다.");
});
