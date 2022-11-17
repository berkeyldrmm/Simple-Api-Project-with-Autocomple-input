var postsdiv=document.querySelector("#posts");
var input=document.querySelector("#input");
var input2=document.querySelector("#input2");
var inputdiv=document.querySelector("#inputdiv");
var errordiv=document.querySelector("#errordiv");
var currentValue=-1;
document.querySelector("#button1").addEventListener("click",function(e) {
    getPost();
    e.preventDefault();
});
document.querySelector("#button2").addEventListener("click",function(e) {
    getAllPosts(input.value);
    e.preventDefault();
});
document.querySelector("#button3").addEventListener("click",function(e) {
    let number=Math.floor(Math.random()*5000)+1;
    getByID(number);
    e.preventDefault();
})

function getByID(id) {
    postsdiv.innerHTML="";
    fetch("https://jsonplaceholder.typicode.com/photos").then(response=>response.json())
    .then(posts=>{
        for (let post of posts) {
            if (post.id==id) {
                let newcard=`<div class="card mx-auto my-2" style="width: 18rem;">
                <img class="card-img-top" src="${post.url}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">Some details</p>
                    <a href="#" class="btn btn-primary">More details</a>
                </div>
                </div>`;
                postsdiv.innerHTML+=newcard;
                break;
                }
            }
        }
    ).catch(err=>{
        postsdiv.innerHTML+=err;
    })
}

function getByName(name) {
    postsdiv.innerHTML="";
    fetch("https://jsonplaceholder.typicode.com/photos").then(response=>response.json())
    .then(posts=>{
        for (let post of posts) {
            if (post.title==name) {
                let newcard=`<div class="card mx-auto my-2" style="width: 18rem;">
                <img class="card-img-top" src="${post.url}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">Some details</p>
                    <a href="#" class="btn btn-primary">More details</a>
                </div>
                </div>`;
                postsdiv.innerHTML+=newcard;
                break;
                }
            }
        }
    ).catch(err=>{
        errordiv.innerHTML=err;
        errordiv.style.display="block";
        setTimeout(()=>{
            errordiv.style.display="none"; 
        },2000);
    })
}

function getPost(){
    try {
        if(input2.value===""&&input.value===""){
            throw new Error("Please enter the post name or number");
        }
        else if(input2.value!==""&&input.value!==""){
            throw new Error("Please enter only one value (name or number)");
        }
        else if(input2.value!==""){
            getByName(input2.value);
        }
        else{
            getByID(input.value);
        }
    } catch (error) {
        errordiv.innerHTML=error;
        errordiv.style.display="block";
        setTimeout(()=>{
            errordiv.style.display="none"; 
        },2000);
    }
}

function getAllPosts(id){
    try {
        if(input.value===""){
            throw new Error("Please enter the number.");
        }
        else{
            fetch("https://jsonplaceholder.typicode.com/photos").then(response=>response.json())
            .then(posts=>{
            postsdiv.innerHTML="";
            for (let index = 0; index < id; index++) {
            let newcard=`<div class="card mx-auto my-2" style="width: 18rem;">
            <img class="card-img-top" src="${posts[index].url}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${posts[index].title}</h5>
              <p class="card-text">Some details</p>
              <a href="#" class="btn btn-primary">More details</a>
            </div>
            </div>`;
        postsdiv.innerHTML+=newcard;
        }
    })
        }
        
    } catch (error) {
        errordiv.innerHTML=error;
        errordiv.style.display="block";
        setTimeout(()=>{
            errordiv.style.display="none"; 
        },2000);
    }
    
}

var postNames=[];

fetch("https://jsonplaceholder.typicode.com/photos").then(response=>response.json()).then(posts=>{
    posts.forEach(post => {
        postNames.push(post.title);
    });
})


var suggestions=document.createElement("div");
suggestions.setAttribute("id","suggestions");
inputdiv.appendChild(suggestions);

input2.addEventListener("input",function(e) {
    suggestions.style.display="block";
    var val=input2.value;
    if (val==="") {
        suggestions.innerHTML="<ul></ul>";
    }else{
        suggestions.innerHTML="<ul>";
        for (let i = 0; i < postNames.length; i++) {
            if(postNames[i].substr(0,val.length).toUpperCase()===val.toUpperCase()){
            suggestions.innerHTML+=`<li class="names my-1">${postNames[i]}</li><hr>`;
        }
    }
    suggestions.innerHTML+="</ul>";
    }
    if(suggestions.innerHTML=="<ul></ul>"||suggestions.innerHTML==""){
        suggestions.style.display="none";
    }else{
        suggestions.style.display="block";
    }
    e.preventDefault();
})

document.getElementsByTagName("body")[0].addEventListener("click",function(e) {
    if (e.target!==input2) {
        suggestions.style.display="none";
    }else if(suggestions.innerHTML=="<ul></ul>"||suggestions.innerHTML==""){
        suggestions.style.display="none";
    }else{
        suggestions.style.display="block";
    }
})


suggestions.addEventListener("click",function(e){
    input2.value=e.target.innerHTML;
    getPost();
});
let x=0;
input2.addEventListener("keydown",function(e) {
    let names=document.querySelectorAll(".names");
    if(e.keyCode===40&&(suggestions.innerHTML!=="<ul></ul>"||suggestions.innerHTML!=="")&&currentValue>=-1){
                currentValue++;
                names[currentValue].style.backgroundColor="aqua";
                names[currentValue].style.color="white";
            if(currentValue>0){
                names[currentValue-1].style.backgroundColor="aliceblue";
                names[currentValue-1].style.color="black";
            }
            if(currentValue>=10){
                suggestions.scrollBy(0,30)
            }
    }
    else if(e.keyCode===38){
        if(currentValue!==-1){
            currentValue--;
            names[currentValue].style.backgroundColor="aqua";
            names[currentValue].style.color="white";
        }
        if(currentValue<names.length){
            names[currentValue+1].style.backgroundColor="aliceblue";
            names[currentValue+1].style.color="black";
        }
        if(currentValue>=10){
            suggestions.scrollBy(0,-15)
        }
        if(input2.value==""){
            currentValue=-1;
        }
    }
    if(e.keyCode===13){
        input2.value=names[currentValue].innerHTML;
        getPost();
        suggestions.style.display="none";
    }
})