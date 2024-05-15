const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

//재할당 해야되니까 let
//toDos에 todo들 push할거임
let toDos = []; 

const savedToDos = localStorage.getItem(TODOS_KEY);
//savedToDOs는 배열모양의 문자열임

if(savedToDos !== null) {
    //아까는 JSON.stringify 스트링화했다면, 이번에는 parse로 스트링화 되어있는것을 배열화 시켜주는것
    //걍 savedToDOs 가져다가 쓰면 걍 문자열을 출력함
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;

    //parsedToDos에 있는 모든 아이템에 대해서 paintToDo가 실행됨
    //만약 parsedToDos에 a,b,c가 있었으면 각각에 대해서 paintToDo가 실행됨
    parsedToDos.forEach(paintToDo);
}

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
    //걍 localStroage.setITem(TODOS_KEY,toDOs) 하면 못생긴 스트링으로 저장됨
    //ex) a => a,b => a,b,c 이따구
    //JSON.stringify 은 모든 변수들을 배열 모양으로 스트링화 시켜줌
}

function deleteToDo(event) {
    //target은 버튼, 이놈의 부모가 li, 이거 자체 삭제
    const li = event.target.parentElement.parentElement;
    li.remove();

    //parseInt는 li의 아이디의 요소를 찍어보면 스트링으로 나오는 데 이걸 숫자로 바꿔주는 것
    //스트링으로 비교하면 잘못된 판단 할 수도 있으니까
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value="";
    const newTodoObj = {
        text: newToDo,
        id: Date.now(),
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

function editToDo(event) {
    const li = event.target.parentElement.parentElement;
    const span = li.querySelector("span");

    //화면에 나타나는 todo 수정
    const newText = prompt("Edit the to-do:", span.innerText);

    //로컬 저장소에 todo 수정
    if(newText !== null && newText.trim() !== "") {
        const todoId = parseInt(li.id);
        toDos = toDos.map((toDo) => {
            //id 같으면 수정
            if(toDo.id === todoId) {
                toDo.text = newText;
            }
            return toDo;
        });
        span.innerText = newText;
        saveToDos();
    }
}

function paintToDo(newToDo) {
    const li = document.createElement("li");
    const span = document.createElement("span");

    //X랑 edit 버튼 묶을 놈/ 체크랑 스판 묶을 놈
    const buttonGroup = document.createElement("div");
    const inlineGroup = document.createElement("div");

    //X버튼 생성
    const deleteButton = document.createElement("button");

    //에딧 버튼 생성
    const editButton = document.createElement("button");

    //체크 박스 생성
    const checkButton = document.createElement("input");
    checkButton.type = `checkbox`;

    li.id = newToDo.id;
    span.innerText = newToDo.text;
    deleteButton.innerText = "X";
    editButton.innerText = "Edit";

    li.className = "list-name";
    span.className = "indenting";
    inlineGroup.className= "disposeLeft";
    buttonGroup.className = "disposeRight";
    checkButton.className = "checkbox-name";
    deleteButton.className="button-name";
    editButton.className="button-name";

    //클릭 이벤트 감지, 클릭하면 deleteToDo 함수 호출
    deleteButton.addEventListener("click", deleteToDo);
    //에딧 클릭하면 editToDo 호출
    editButton.addEventListener("click", editToDo);

    toDoList.appendChild(li);
    inlineGroup.appendChild(checkButton);
    inlineGroup.appendChild(span);
    li.appendChild(inlineGroup);
    buttonGroup.appendChild(deleteButton);
    buttonGroup.appendChild(editButton);
    li.appendChild(buttonGroup);
}

toDoForm.addEventListener("submit", handleToDoSubmit);