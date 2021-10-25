let body = document.getElementsByClassName("todo-app__root")[0],
    main = document.getElementsByClassName("todo-app__main"),
    input = document.getElementsByClassName("todo-app__input"),
    todoLIST = document.getElementById("todo-list"),
    todoItem = document.getElementsByClassName("todo-app__item"),
    totalNum = document.getElementsByClassName("todo-app__total")[0],
    footer = document.getElementById("todo-footer"),
    filter = document.getElementsByClassName("todo-app__view-buttons")[0],
    clearbutton = document.getElementsByClassName("todo-app__clean")[0];

var ToDoList = [];
var filter_state=0;

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
        FooterUpdate();
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
        switch(filter_state){
            case 1:
                Display_flex(todoItem[n],!ToDoList[n].state());
                break;
            case 2:
                Display_flex(todoItem[n],ToDoList[n].state());
                break;
            default:
                Display_flex(todoItem[n],true);
        }
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
    switch(filter_state){
        case 1:
            Display_flex(li,!check);
            break;
        case 2:
            Display_flex(li,check);
            break;
        default:
            Display_flex(li,true);
    }
    todoLIST.appendChild(li);
}

function Display_flex(tag, boolean){
    if(boolean)
        tag.style.display='flex';
    else
        tag.style.display='none';
}

function Display_block(tag, boolean){
    if(boolean)
        tag.style.display='block';
    else
        tag.style.display='none';
}

function Visibility(tag, boolean){
    if(boolean)
        tag.style.visibility='visible';
    else
        tag.style.visibility='hidden';
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

function FooterUpdate(){
    var n = ToDoList.length,
        n_initial = ToDoList.length;
    for(var i=0;i<ToDoList.length;i++){
        if(ToDoList[i].state())
            n--;
    }
    totalNum.innerHTML=(`${n} left`);
    // console.log(n_initial-n);
    Visibility(clearbutton, n_initial-n);
}

function RefreshMain(){
    if(todoItem.length === 0){
        Display_block(todoLIST,0);
        Display_flex(footer,0);
    }
    else{
        Display_block(todoLIST,1);
        Display_flex(footer,1);
    }
    FooterUpdate();
}

function Filter_All(){
    for(var n=0;n<todoItem.length;n++){
        Display_flex(todoItem[n],true);
    }
}
function Filter_Active(){
    for(var n=0;n<todoItem.length;n++){
        Display_flex(todoItem[n],!ToDoList[n].state());
    }
}
function Filter_Completed(){
    for(var n=0;n<todoItem.length;n++){
        Display_flex(todoItem[n],ToDoList[n].state());
    }
}
function Filter(){
    switch(filter_state){
        case 1:
            Filter_Active();
            break;
        case 2:
            Filter_Completed();
            break;
        default:
            Filter_All();
    }
}
function Clear(){
    for(var n=0;n<todoItem.length;n++){
        if(ToDoList[n].state()){
            ToDoList.splice(n, 1);
            todoLIST.removeChild(todoItem[n]);
            n--;
        }
    }
    RefreshIndex();
    FooterUpdate();
}

//main
RefreshMain();
input[0].addEventListener("keyup", function(e) {
    e.preventDefault();
    if (e.keyCode === 13) {
        ToDoList.push(new toDoItem(`${input[0].value}`,todoItem.length));
        input[0].value='';
        RefreshMain();
    }
});

filter.addEventListener('click', function(e){
    // console.log(e.target.textContent);
    for(var i=0;i<filter.getElementsByTagName("button").length;i++){
        filter.getElementsByTagName("button")[i].classList.remove("active");
    }
    e.target.classList.add("active");
    switch (e.target.textContent) {
        case 'All':
            Filter_All();
            filter_state=0;
            break;
        case 'Active':
            Filter_Active();
            filter_state=1;
            break;
        case 'Completed':
            Filter_Completed();
            filter_state=2;
            break;   
        default:
        console.log("error occur at filter");
    }

}, false);
filter.getElementsByTagName("button")[0].classList.add("active");
clearbutton.addEventListener('click', function(e){
    Clear();
}, false);
