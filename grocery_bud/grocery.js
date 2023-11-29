// selection items
const alert=document.querySelector('.alert');
const form=document.querySelector('.grocery-form');
const grocery=document.getElementById('grocery');
const submitbtn=document.querySelector('.submit-btn');
const container=document.querySelector('.grocery-container');
const list=document.querySelector('.grocery-list');
const clearbtn=document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag=false;
let editID="";
// ****event listeners****//
//submit form
  
form.addEventListener('submit',additem);

// clear items
clearbtn.addEventListener('click',clearitem)

//load items
window.addEventListener('DOMContentLoaded',setupItems)

//***function****// 

function additem(e)
{
  e.preventDefault();
  let value=grocery.value;
  let id=new Date().getTime().toString();
  
if(value && !editFlag)
{
  createlistitem(id,value)
  displayalert('item added to the list','success');
  //show container
{
  container.classList.add('show-container')
}
// add to local storage
addToLocalStorage(id,value);

//set back to default

setBackToDefault();
}

else if(value && editFlag)
{
  editElement.innerHTML=value;
  displayalert('value changed','success')
  
  //edit local storage

  editlocalstorage(editID,value)

  setBackToDefault();

}
else
{
 displayalert('please enter a value','danger')
}

}

//display alert

function displayalert(text,action)
{
  alert.textContent=text;
  alert.classList.add(`alert-${action}`);
  //remove alert
  setTimeout(function(){
    alert.textContent='';
    alert.classList.remove(`alert-${action}`);
  },1000);
}
//clear-items

function clearitem()
{
  const items=document.querySelectorAll('.grocery-item')
 if(items.length>1)
 { items.forEach(function(item)
  {
    list.removeChild(item);
  })
}
container.classList.remove('show-container');
displayalert('empty list','danger')
setBackToDefault();
localStorage.removeItem('list')

}
//set back to default


// local storage
function addToLocalStorage(id,value)
{
  // console.log('added to local storage')
  const grocery={id,value};
 
  let items=getlocalstorage();

  items.push(grocery);
  localStorage.setItem('list',JSON.stringify(items));


}

function removeformlocalstorage(id)
{
 let items=getlocalstorage();
 items=items.filter(function(item)
 {
  if(item.id!=id)
  {
    return item;
  }
  
 })
 localStorage.setItem('list',JSON.stringify(items));

}
function editlocalstorage(id,value)
{
  let items=getlocalstorage();
  items=items.map(function(item)
  {
    if(item.id===id)
    {
      item.value=value;
    }
    return item;
  })
  localStorage.setItem("list",JSON.stringify(items));
}
 
function getlocalstorage()
{
 return localStorage.getItem('list')?JSON.parse(localStorage.getItem('list')):[];
  
}

//edititem

function deleteitem(e)
{
 const element=e.currentTarget.parentElement.parentElement;
 const id=element.dataset.id;
 list.removeChild(element);
 if(list.children.length === 0)
 {
  container.classList.remove('show-container')
 }
 displayalert('item removed' ,"danger")
 setBackToDefault();

 removeFromLocalStorage(id);
}

function edititem(e)
{
  const element=e.currentTarget.parentElement.parentElement;
  editElement=e.currentTarget.parentElement.previousElementSibling;
  grocery.value=editElement.innerHTML;
  editFlag=true;
  editID=element.dataset.id;
  submitbtn.textContent="edit";
}

function setBackToDefault()
{
  grocery.value='';
  editFlag=false;
  editID='';
  submitbtn.textContent='submit'
}



// set up items

function setupItems()
{
  let items=getlocalstorage();
  if(items.length>0)
  {
   items.forEach(function(item)
   {
    createlistitem(item.id,item.value)
   });
   container.classList.add('show-container')
  }
}

function createlistitem(id,value)
{
  const element=document.createElement('article')
  let attr=document.createAttribute('data-id')
  attr.value=id;
  element.setAttributeNode(attr);
  element.classList.add('grocery-item')
  element.innerHTML=`<p class="title">${value}</p>
  <div class="btn-container">
    <button type="button" class="edit-btn">
      <i class="fas fa-edit"></i>
    </button>
    <button class="delete-btn">
      <i class="fas fa-trash">
      </i>
    </button>
  </div>`
  //edit btn
  const editbtn=element.querySelector('.edit-btn')
   editbtn.addEventListener('click',edititem)
 
   //delete btn
  const deletebtn=element.querySelector('.delete-btn')
     deletebtn.addEventListener('click',deleteitem)

  //append child
  list.appendChild(element);
}