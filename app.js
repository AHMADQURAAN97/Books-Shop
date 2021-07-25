'use strict';


let container = document.getElementById('container');
let containerForm = document.getElementById('containerform');
let containerTable = document.getElementById('containertable');
let tableEl = document.createElement('table');
containerTable.appendChild(tableEl);
let myForm = document.getElementById('myform');


let books =[];

function book (boName,bPrice) {

    this.boName = boName;
    this.bPrice = bPrice;
    this.bPages = this.randomPages();

    books.push(this);

    saveToLocalStorage();
};


book.prototype.randomPages = function (){


    let min = Math.ceil(1);
    let max = Math.floor(500);
  let randomP = Math.floor(Math.random() * (max - min) + min); 
   return randomP;
};

function createTableHeader (){

let trEl = document.createElement('tr');

let thBookNameEl = document.createElement('th');
thBookNameEl.textContent = "Book Name";
trEl.appendChild(thBookNameEl);

let thBookPageEl = document.createElement('th');
thBookPageEl.textContent = "Book Pages"
trEl.appendChild(thBookPageEl);

let thPriceEl = document.createElement('th');
thPriceEl.textContent = "Price";
trEl.appendChild(thPriceEl);

let thtotalEl = document.createElement('th');
thtotalEl.textContent = "Total Price :";
trEl.appendChild(thtotalEl);
tableEl.appendChild(trEl);

}
let sum=0;
book.prototype.render = function(){

    let trEl = document.createElement('tr');

    let tdEl1 = document.createElement('td');
    tdEl1.textContent =this.boName;
    trEl.appendChild(tdEl1);
    
    let tdEl2 = document.createElement('td');
    tdEl2.textContent = this.bPages;
    trEl.appendChild(tdEl2);


    

    let tdEl3 = document.createElement('td');
    tdEl3.textContent = this.bPrice;
    trEl.appendChild(tdEl3);


    sum += parseFloat(this.bPrice);

    // let trEl = document.createElement('tr'); 

    let tdEl4 = document.createElement('td');
    tdEl4.textContent = sum;
    trEl.appendChild(tdEl4);

    tableEl.appendChild(trEl);
    // tableEl.appendChild(trEl2);

}

// book.prototype.render2 = function{
//     let ulEl = document.createElement('ul');
//     let liEl = document.createElement('li');
//     liEl.textContent =`Totals : ${sum}`

//     ulEl.appendChild(liEl);
//     tableEl.appendChild(ulEl);
// }


createTableHeader ();

// =================================Form======================
myForm.addEventListener('submit',addBook );

function addBook (event){

    event.preventDefault();

    let boName = event.target.boName.value;
    let bPrice = event.target.bPrice.value;

    let newBook = new book (boName,bPrice);

    newBook.randomPages();
    newBook.render();
    // newBook.render2();
}


function saveToLocalStorage() {

    let saveLocal = JSON.stringify(books);
    localStorage.setItem('bBook',saveLocal);
}

function readFromLocalStorage() {

let stringObj = localStorage.getItem('bBook');
let normalObj = JSON.parse(stringObj);

if (normalObj !== null) {

for (let i= 0 ; i < normalObj.length ; i++){

 new book (normalObj[i].bName,normalObj[i].bPrice)

 books[i].render();

}
}
}
readFromLocalStorage();