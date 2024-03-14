// 宣告變數
let data = [];
const list = document.querySelector('.list')
const input = document.querySelector('.inputbox');
const addBtn = document.querySelector('.addbtn');
const tabBtn = document.querySelector('.tab');
const content = document.querySelector('.content')
const tabBtnAll = document.querySelectorAll('.tabname li');
const tabAll = document.querySelector("#taball");
const tabUn = document.querySelector("#tabunfin");
const tabFin = document.querySelector("#tabfin");
const unNum = document.querySelector('.f-num');
const cleanFin = document.querySelector('.cleanfin')
let count=0;

// content顯示判斷
function contentShow(){
    if(data.length!==0){
        content.classList.add('cont-show');
    }else{
        content.classList.remove('cont-show');
    };
}

// 未完成數量
function undoNum(){
    let undo=data.filter((item)=>item.checked=="");
    let num=undo.length;
    unNum.textContent=num;
};

// 刪除已完成項目
cleanFin.addEventListener("click",(e)=>{
    let finData=[];
    finData=data.filter((item)=>item.checked=="");
    data=finData;
    updateData();
});

// 刪除完成項目按鈕狀態
function cfBtnStatus(){
    let fin=data.filter((item)=>item.checked=="checked");
    if(fin.length==0){
        cleanFin.disabled=true;
        cleanFin.classList.remove('cf-act');
    }else{
        cleanFin.disabled=false;
        cleanFin.classList.add('cf-act');
    };
};

// 回tab全部
function tabAllBtn(){
    tabBtnAll.forEach((item)=>{
        item.classList.remove('tabact');
    });
    tabAll.classList.add('tabact');
};

// 新增按鈕監聽
addBtn.addEventListener("click",addTodo);

// 鍵盤監聽
input.addEventListener("keyup",(e)=>{
    if(e.key=="Enter"){
        addTodo(e);
    };
});

// 新增待辦
function addTodo(e){
    e.preventDefault();
    if(count==0){
        tabBan(tabFin);
    };
    count+=1;
    if(input.value==""){
        alert("請輸入內容");
        return;
    };
    let obj = {};
    obj.content=input.value;
    obj.checked="";
    obj.id=Date.now();
    data.unshift(obj);
    renderData(data);
    tabAllBtn();
};

//資料刪除、賦予checked狀態
list.addEventListener("click",(e)=>{
    let num= e.target.dataset.num;
    let dataIndex = data.findIndex((item)=>item.id==num);
    if(e.target.className=="delete"){
        e.preventDefault();
        data.splice(dataIndex,1);
        updateData();
    }else{
        if(data[dataIndex].checked==""){
            data[dataIndex].checked="checked";
        }else if(data[dataIndex].checked=="checked"){
            data[dataIndex].checked="";
        };
        setTimeout(updateData, 140);
    };
});

// TAB切換
tabBtn.addEventListener("click",(e)=>{
    if(e.target.className=="tabbtn tabban"){
        return;
    };
    tabBtnAll.forEach((item)=>{
        item.classList.remove('tabact');
    });
    e.target.classList.add('tabact');
    updateData();
});

// TAB按鈕啟用判斷
function tabBtnStatus(){
    let undoData=data.filter((item)=>item.checked=="");
    let finData=data.filter((item)=>item.checked=="checked");
    if(undoData.length==0){
        tabUn.classList.add('tabban');
    }else{
        tabUn.classList.remove('tabban');
    };
    if(finData.length==0){
        tabFin.classList.add('tabban');
    }else{
        tabFin.classList.remove('tabban');
    };
}

// TAB按鈕禁用(搭配addTodo使用)
function tabBan(btn){
    btn.classList.add('tabban')
};

// 資料更新
function updateData(){
    let showData=[];
    if(tabAll.classList.contains('tabact')){
        showData=data;
    };
    if(tabUn.classList.contains('tabact')){
        showData=data.filter((item)=>item.checked=="");
        if(showData.length==0){
            renderData(data);
            tabBtnStatus();
            tabAllBtn();
            return;
        };
    };
    if(tabFin.classList.contains('tabact')){
        showData=data.filter((item)=>item.checked=="checked");
        if(showData.length==0){
            renderData(data);
            tabBtnStatus();
            tabAllBtn();
            return;
        };
    };
    tabBtnStatus();
    renderData(showData);
};

// 資料渲染
function renderData(todo){
    let str = "";
    todo.forEach((item,index)=>{
        str+=` <li><label class="checkbox"><input type="checkbox" data-num="${item.id}"  ${item.checked}><span class="list-cont">${item.content}</span><a href="#" class="delete" data-num="${item.id}"></a><span class="check-r"></span></label></li>`;
    });
    list.innerHTML=str;
    contentShow();
    undoNum();
    cfBtnStatus();
    str="";
    input.value="";
};


