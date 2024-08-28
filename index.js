var state= {
    taskList:[]
};
// DOM Objects
var taskContents= document.querySelector(".task_contents");
var taskmodal=document.querySelector(".task_modal_body");
// console.log(taskContents);

var htmltaskcontent= ({id, title, description, type, url}) => `
<div class='col-md-6 col-lg-4 mt-3' id=${id} key=${id}>
<div class='card shadow-sm task_card'>
<div class= 'card-header d-flex justify-content-end task_card_header'>
<button type='button' class='btn btn-outline-info mr-2 name=${id}'>
<i class='fas fa-pencil-alt' name=${id}></i>
</button>
<button type='button' class='btn btn-outline-danger mr-2 name=${id}'>
<i class='fas fa-trash-alt' name=${id}></i>
</button>
</div>
<div class='card-body'>
${
    url ?
    `<img width='100%' src=${url} alt='card image cap' class='card-image-top md-3 rounded-lg'/>`
    :`<img width='100%' src="https://tse2.mm.bing.net/th?id=OIP.sWCvltMZF_s3mjA5sL-RdgHaE8&pid=Api&P=0&h=180" alt='card image cap' class='card-image-top md-3 rounded-lg'/>`

}
<h4 class='card-title'>${title}</h4>
<p class='description trim-3-lines text-muted data-gram_editor='false''>${description}</p>
<div class='tags text-white d-flex flex-wrap'>
<span class='badge bg-primary m-1'>${type}</span></div>
</div>
<div class='card-footer'>
<button type='button' class='btn btn-outline-primary float-right' data-bs-toggle='modal' data-bs-target='#showTask' id=${id} onclick='openTask.apply(this, arguments)'>Open Task</button>
</div>
</div>
</div>
`;
 var htmlmodalcontent=({id,title,description,url})=>{
    var date= new Date(parseInt(id));
    return `
    <div id=${id}>
    ${
    url ?
    `<img width='100%' src=${url} alt='card image cap' class='card-image-top md-3 rounded-lg'/>`
    :`<img width='100%' src="https://tse2.mm.bing.net/th?id=OIP.sWCvltMZF_s3mjA5sL-RdgHaE8&pid=Api&P=0&h=180" alt='card image cap' class='card-image-top md-3 rounded-lg'/>`

}
    <strong class='text-sm text-muted'>Created on ${date.toDateString()}</strong>
    <h2 class='my-3'>${title}</h2>
    <p class='lead'>${description}</p>
    </div>
    `;
 };


 var updateLocalStorage =() =>{
    localStorage.setItem('task',JSON.stringify({
        tasks:state.taskList,
    }))
 }

 var loadInitialData=() =>{
    var localStorageCopy= JSON.parse(localStorage.tasks)
    if(localStorageCopy) state.taskList= localStorageCopy.tasks;

    state.taskList.map((cardDate)=>{
        taskContents.insertAdjacentHTML("beforeend",htmltaskcontent(cardDate));
    })
 }

 var handleSubmit = (event)=>{
    const id= `${Date.now()}`;
    const input = {
        url: document.getElementById("imageURL").value,
        title: document.getElementById("tasktitle").value,
        type: document.getElementById("tasktype").value,
        description: document.getElementById("taskdescription").value,
    };
    if(input.title === "" || input.type === "" || input.description === ""){
        return alert("Please fill all required data");
    }
    // "..." a spread operator
    taskContents.insertAdjacentHTML("beforeend",htmltaskcontent({
        ...input,id
    }))
    state.taskList.push({...input,id});
    updateLocalStorage();
 } 

 var openTask=(e)=>{
    if(!e) e=window.event;
    var getTask=state.taskList.find(({id})=>id=== e.target.id);
    taskmodal.innerHTML=htmlmodalcontent(getTask)
 }