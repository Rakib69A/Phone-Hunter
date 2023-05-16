const loadPhones = async(searchText,dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data,dataLimit);
}

const displayPhones = (phones,dataLimit) =>{
    console.log(phones);
    // phones.forEach(phone => {
    //     console.log(phone)
    // });
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.innerText = ' ';
    //display more than 10 phones
    const showAll = document.getElementById('show-all');
    if( phones.length > dataLimit){
        phones = phones.slice(0,10);
        showAll.classList.remove('d-none');
    }else{
        showAll.classList.add('d-none')
    }
    
    //display no phone message
    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }else{
        noPhone.classList.add('d-none');
    }

    //display all phones
    for(const phone of phones){
        console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetails">
                    Show Details
                </button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneDiv);
    }
    toggleSpinner(false);
}
//Common function 
const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText,dataLimit);
}
//Search field Button
document.getElementById('btn-search').addEventListener('click',function(){
    processSearch(10);
})
//Loading function
const toggleSpinner = isLoading =>{
    const loader = document.getElementById('loader');
    if(isLoading){
        loader.classList.remove('d-none');
    }else{
        loader.classList.add('d-none');
    }
}
//Show All Button
document.getElementById('show-all').addEventListener('click',function(){
    processSearch();
})
//Pressing Enter search the result
const input = document.getElementById("search-field");
input.addEventListener("keydown", function(event){
    // console.log(event.key);
  if (event.key === "Enter") {
    processSearch(10);
  }
});
//Show phone details
const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}
//Details in modals
const displayPhoneDetails = phone =>{
    console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <h5>Name: ${phone.name}</h5>
        <p>ReleaseDate: ${phone.releaseDate ? phone.releaseDate : 'No releaseDate'}</p>
        <p>Brand: ${phone.brand}</p>
        <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : "No storage detail"}</p>
        <p>DisplaySize: ${phone.mainFeatures.displaySize}</p>
        <p>Memory: ${phone.mainFeatures.memory}</p>
        <h4 class="text-center">Others</h4>
        <p>Bluetooth: ${phone.others.Bluetooth}</p>
        <p>GPS: ${phone.others.GPS}</p>
        <p>NFC: ${phone.others.NFC}</p>
        <p>Radio: ${phone.others.Radio}</p>
        <p>USB: ${phone.others.USB}</p>
        <p>WLAN: ${phone.others.WLAN}</p>
        <h4 class="text-center">Sensors</h4>

    `;
    for(const sensor of phone.mainFeatures.sensors){
        const sensors = document.createElement('div');
        console.log(sensor);
        sensors.innerHTML = `
            <p>${phone.mainFeatures.sensors ? sensor : "NO sensor available"}</p>
        `;
        phoneDetails.appendChild(sensors);
    }
    
}
loadPhones('apple',10);