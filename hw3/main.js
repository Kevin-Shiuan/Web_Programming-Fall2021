let body = document.getElementsByClassName("todo-app__root")[0],
    main = document.getElementsByClassName("todo-app__main"),
    input = document.getElementsByClassName("todo-app__input"),
    todoLIST = document.getElementById("todo-list"),
    todoItem = document.getElementsByClassName("todo-app__item"),
    totalNum = document.getElementsByClassName("todo-app__total")[0],
    footer = document.getElementById("todo-footer"),
    filter = document.getElementsByClassName("todo-app__view-buttons")[0];

var ToDoList = [];

class toDoItem{
    constructor(name, n) {
        this.itemName = name;
        this.done = false;
        this.index = n;
        this.render();
    }
    render(){
        // console.log("rendering "+this.itemName+"  index="+this.index);
        CreateItem(this.itemName, this.index, this.done);
    }
    name(){
        return this.itemName;
    }
    index(){
        return this.index;
    }    
    setIndex(n){
        this.index=n;
    }
    state(){
        return this.done;
    }
    setState(newState){
        this.done = newState;
        todoItem[this.index].getElementsByClassName("todo-app__item-detail")[0].classList.toggle("done");
        SumTotal();
    }
}

function CreateItem(text, n, check){
    let li = document.createElement("li"),
        div = document.createElement("div"),
        label = document.createElement("label"),
        input = document.createElement("input"),
        h1 = document.createElement("h1"),
        img = document.createElement("img");
    li.setAttribute('class',"todo-app__item");
    div.setAttribute('class',"todo-app__checkbox");
    div.addEventListener('click', function (e) {
        ToDoList[n].setState(!ToDoList[n].state());
      }, false);
    input.setAttribute('type',"checkbox");
    if(check) input.checked=true;
    input.setAttribute('id',`${n}`);
    input.addEventListener('click', function (e) {
        e.stopPropagation();
      }, false);
    label.setAttribute('for',`${n}`);
    h1.setAttribute('class',"todo-app__item-detail");
    h1.innerHTML=text;
    img.setAttribute('src',"./img/x.png");
    img.setAttribute('class',"todo-app__item-x");
    img.addEventListener('click', function (e) {
        ToDoList.splice(n, 1);
        todoLIST.removeChild(todoItem[n]);
        RefreshIndex();
        RefreshMain();
      }, false);
    div.appendChild(input);
    div.appendChild(label);
    li.appendChild(div);
    li.appendChild(h1);
    li.appendChild(img);
    todoLIST.appendChild(li);
}

function Visibility_flex(tag, boolean){
    if(boolean)
        tag.style.display='flex';
    else
        tag.style.display='none';
}

function Visibility_block(tag, boolean){
    if(boolean)
        tag.style.display='block';
    else
        tag.style.display='none';
}

function RefreshIndex(){
    if(todoItem.length != ToDoList.length){
        console.log("todoItem.length"+todoItem.length);
        console.log("ToDoList.length"+ToDoList.length);
        console.log("data length and html list length not same!");
        return;
    }
    while (todoLIST.firstChild) {
        todoLIST.removeChild(todoLIST.firstChild);
    }
    for(var i=0;i<ToDoList.length;i++){
        ToDoList[i].setIndex(i);
        ToDoList[i].render();
    }
}

function SumTotal(){
    var n=ToDoList.length;
    for(var i=0;i<ToDoList.length;i++){
        if(ToDoList[i].state())
            n--;
    }
    totalNum.innerHTML=(`${n} left`);
}

function RefreshMain(){
    if(todoItem.length === 0){
        Visibility_block(todoLIST,0);
        Visibility_flex(footer,0);
    }
    else{
        Visibility_block(todoLIST,1);
        Visibility_flex(footer,1);
    }
    SumTotal();
}


//main
RefreshMain();
input[0].addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        ToDoList.push(new toDoItem(`${input[0].value}`,todoItem.length));
        input[0].value='';
        RefreshMain();
    }
});

filter.addEventListener('click', function(e){
    console.log(e.target.textContent);
    // 判斷目標元素若是 li 則執行 console.log
    // if( e.target.tagName.toLowerCase() === 'li' ){
    //   console.log(e.target.textContent);
    // }
  
  }, false);