// (c) Anuflora Systems 
const balance = document.getElementById('balance');
const money_plus = document.getElementById('deposit');
const money_minus = document.getElementById('loan');
const list = document.getElementById('list');
const form = document.getElementById('form');
const custname = document.getElementById('custname');

const reco = document.getElementById('reco');
const b1 = document.getElementById('b1');
const b2 = document.getElementById('b2');


const TransactionDataAll = [
   { id: 1, customername: 'Flora', bank: 'DBS', deposit: 3000, loan: 2000 },
   { id: 2, customername: 'Flora', bank: 'OCBC', deposit: 4000, loan: 2000 },
   { id: 3, customername: 'Mikhil', bank: 'DBS', deposit: 3000, loan: 2000 },
   { id: 4, customername: 'Sashil', bank: 'UOB', deposit: 6000, loan: 1000 },
   { id: 5, customername: 'Jack', bank: 'UOB', deposit: 6000, loan: 8000 },
   { id: 6, customername: 'Jill', bank: 'UOB', deposit: 7000, loan: 4000 },

  ];

 var TransactionData = null;

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  const balanceFinal = document.createElement('li');
  const balance_item = (transaction.deposit) - (transaction.loan);


  
  if (balance_item <0) {
    balanceFinal.classList.add('minus');
    balanceFinal.innerHTML = `
    ${transaction.customername}-${transaction.bank}  <span> -$ ${Math.abs(balance_item)} </span>`
  } else {
    balanceFinal.classList.add('plus');
    balanceFinal.innerHTML = `
   ${transaction.customername}-${transaction.bank}  <span> $ ${Math.abs(balance_item)} </span>`;
  }; 

  list.appendChild(balanceFinal);

}

// Update the balance, deposit and loan
function updateValues() {
  const deposits = TransactionData.map(transaction => transaction.deposit);
  const loans = TransactionData.map(transaction => transaction.loan);
  // no const here
  total_deposit = deposits.reduce((acc, item) => (acc += item), 0).toFixed(2);
  total_loan = loans.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const bal = total_deposit - total_loan;
  balance.innerText = `$${bal}`;
  money_plus.innerText = `$${total_deposit}`;
  money_minus.innerText = `$${total_loan}`;
  reco.innerText = (bal >= 0)? "You Have Sound Financial Health": "Your Financial Health is Weak";
}

function init() {
  
  list.innerHTML = '';
  list.innerHTML = '';
  reco.innerHTML = '';
  TransactionData = [...TransactionDataAll];
  TransactionData.forEach(addTransactionDOM);
  updateValues();
}

function filterTransaction(e) {
  e.preventDefault();  //to prevent form from submitting and refreshing the page
  list.innerHTML = '';
  reco.innerHTML = '';
  TransactionData = TransactionDataAll.filter(tran => tran.customername.toUpperCase() == custname.value.toUpperCase());  
  TransactionData.forEach(addTransactionDOM);
  updateValues(); 
}

// PIE CHART SCRIPT
function myFunction() {
//data source
  let data = [
    // no int here
    {label: "Deposit", amt: total_deposit},
    {label: "Loan", amt: total_loan},
  ];

//canvas
  var svg = d3.select("svg"),
  width = svg.attr("width"),
  height = svg.attr("height"),
  radius = Math.min(width, height) / 2;
  
  //The <g> SVG element is a container used to group other SVG elements.
  var g = svg.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// set the color scale  
  var color = d3.scaleOrdinal([
        '#00E676', '#FF1744']);

  // Compute the position of each group on the pie:   
  var pie = d3.pie().value(function(d) { 
    //change data.amt to d.amt
        return d.amt; 
     });
  //radius for the arc   
  var path = d3.arc()
               .outerRadius(radius - 10)
               .innerRadius(0);
  
  //radius for the label      
  var label = d3.arc()
                .outerRadius(radius)
               .innerRadius(radius - 80);
        
  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  var arc = g.selectAll(".arc")
           .data(pie(data))
           .enter()
           .append("g")
           .attr("class", "arc");

      arc.append("path")
           .attr("d", path)
           //change data.label to d.data.label
           .attr("fill", function(d) { return color(d.data.label); });

           console.log(arc);
    
      arc.append("text")
         .attr("transform", function(d) { 
           return "translate(" + label.centroid(d) + ")"; 
   })
        //change data.label to d.data.label
        .text(function(d) { return d.data.label; });

        svg.append("g")
        .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
        .append("text").text("Expenses this Month - July 2020")
        .attr("class", "title")
  
  }

  init();
//form.addEventListener('submit', filterTransaction);
b1.addEventListener('click',filterTransaction);
b2.addEventListener('click',init);  //no need to call init. when no event handler it will reload/referesh the page
