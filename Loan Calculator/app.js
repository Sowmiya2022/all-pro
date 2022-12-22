//Listen for sumbit
document.getElementById('loan-form').addEventListener('submit', function(e){

//hide result
document.getElementById('results').style.display ='none';

//Show loader
document.getElementById('loading').style.display ='block';

setTimeout(calculateResults, 2000);

e.preventDefault();

});

//calculate Results
function calculateResults(){
  console.log('calculating...');

  //UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;


  //compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
    // show result
    document.getElementById('results').style.display ='block';
    
    //Hide loading

    document.getElementById('loading').style.display ='none';
    
  } else {
    showError('please check your numbers');
    }




}

//show error
function showError(error){
// Hide result
  document.getElementById('results').style.display ='none';
    
  //Hide loading

  document.getElementById('loading').style.display ='none';
  
  //crete a div
  const errorDiv = document.createElement('div');
  //get element
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  //add class
  errorDiv.className = "alert alert-danger";

  //create text node and append div
  errorDiv.appendChild(document.createTextNode(error));

  //Insert error above heading
  card.insertBefore(errorDiv, heading);

  //clear error after 3 seconds
  setTimeout(clearError, 3000);

  
}

// clear error
function clearError(){
  document.querySelector('.alert').remove();
}