// 宣告變數
let data = [];
const list = document.querySelector('.list')
const input = document.querySelector('.inputbox');
const addBtn = document.querySelector('.addbtn');
const tabBtn = document.querySelector('.tab');
const tabBtnAll = document.querySelectorAll('.tabname li');
const tabAll = document.querySelector("#taball");
const tabUn = document.querySelector("#tabunfin");
const tabFin = document.querySelector("#tabfin");

// 回tab全部
function tabAllBtn(){
    tabBtnAll.forEach((item)=>{
        item.classList.remove('tabact');
    });
    tabAll.classList.add('tabact');
}

// 新增待辦
addBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    if(input.value==""){
        alert("請輸入內容");
        return;
    };
    let obj = {};
    obj.content=input.value;
    obj.checked="";
    data.unshift(obj);
    renderData(data);
    tabAllBtn();
});

//資料刪除、賦予checked狀態
list.addEventListener("click",(e)=>{
    let num= e.target.dataset.num;
    if(e.target.className=="delete"){
        e.preventDefault();
        data.splice(num,1);
        renderData(data);
    }else{
        if(data[num].checked==""){
            data[num].checked="checked";
        }else if(data[num].checked=="checked"){
            data[num].checked="";
        };
    };
});


// TAB切換
tabBtn.addEventListener("click",(e)=>{
    tabBtnAll.forEach((item)=>{
        item.classList.remove('tabact');
    });
    e.target.classList.add('tabact');
    updateData();
});


// 資料更新
function updateData(){
    let showData=[];
    if(tabAll.classList.contains('tabact')){
        showData=data;
    };
    if(tabUn.classList.contains('tabact')){
        showData=data.filter((item)=>item.checked=="");
    };
    if(tabFin.classList.contains('tabact')){
        showData=data.filter((item)=>item.checked=="checked");
    };
    renderData(showData);
};

// 資料渲染
function renderData(todo){
    let str = ""
    todo.forEach((item,index)=>{
        str+=` <li><label class="checkbox"><input type="checkbox" data-num="${index}"  ${item.checked}><span class="list-cont">${item.content}<a href="#" class="delete" data-num="${index}">x</a></span><span class="check-r"></span></label></li>`
    });
    list.innerHTML=str;
    str="";
    input.value="";
};


