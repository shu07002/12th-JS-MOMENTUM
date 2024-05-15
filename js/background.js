const images = ["img01.jpg", "img02.jpg", "img03.jpg"];
const BG = "background";

const chosenImage = images[Math.floor(Math.random()*images.length)];
//console.log(chosenImage);

//createElement : js 안에서 html 요소 만들어줌
const bgImage = document.createElement("img"); //이미지 태그 만들었음
bgImage.src = `img/${chosenImage}`; //src 속성 추가해서 태그 만들어줌
//console.log(bgImage);
document.body.appendChild(bgImage); //html body에 넣어줌

//js안에서도 css를 다룰 수 있음
bgImage.className = BG;
