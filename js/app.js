const loadBillionaries = (searchText, dataLimit) =>{
    const url = `https://forbes400.onrender.com/api/forbes400/industries/${searchText}`
    fetch(url)
    .then(res =>  res.json())
    .then(data => displayPersons(data, dataLimit))
    .catch(error => console.log(error))
}

const displayPersons = (persons, dataLimit) =>{
    console.log(persons);
    const billionaireContainer = document.getElementById('billionaire-container');
    billionaireContainer.textContent = '';
    //DISPLAY 6 PERSONS ONLY
    if(persons.length > 6 && dataLimit ){
      persons = persons.slice(0,6)
    }else{
        persons = persons
    }


    // //DISPLAY ALL PERSONS
    persons.forEach(person =>{
        console.log(person);
        const personDiv = document.createElement('div');
        personDiv.innerHTML = `
        <div class="card card-compact w-full bg-base-content shadow-2xl">
        <figure class="p-4"><img src="${person.person.squareImage ? person.person.squareImage : 'No image Found'}" alt=""></figure>
        <div class="card-body">
        <h2 class="card-title text-[22px] text-white "> ${person.person.name ? person.person.name : 'no name found'}</h2>
        <p class="text-[18px] text-white font-semibold">Citizenship: ${person.countryOfCitizenship ? person.countryOfCitizenship : 'No citizenship found for this person'} </p>
        <p class="text-white"> State: ${person.state ? person.state : 'no state found'}</p>
        <p class="text-white"> Total Shares: ${person.financialAssets ? person.financialAssets[0]?.numberOfShares : 'no shares found' } </p>
        <p class="text-white"> Shares Price: ${person.financialAssets ? person.financialAssets[0]?.sharePrice : 'no share price found'}</p>
        <div class="card-actions justify-start">
          <a href="#my-modal-2"  class="underline cursor-pointer text-[18px] text-sky-700 hover:text-blue-400 mb-2" for="my-modal">See details</a>
        </div>
      </div>
    </div>
        
        `
        billionaireContainer.appendChild(personDiv)
    })
}


const processSearch = (dataLimit) =>{
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadBillionaries(searchText, dataLimit);
}

// not the best way to show all
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch()
})

document.getElementById('btn-search').addEventListener('click', function(){
  processSearch(6)
})



loadBillionaries()