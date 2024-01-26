//script2.js

let searchDate = document.querySelector("#searchDate");
const searchBtn = document.querySelector("#searchBtn");



function countBox(){
    // alert("AA");
    // console.log(searchDate.value);
    // document.getElementById('loading').style.display = 'block';
    startLoadingAnimation();
    let formattedDate = formatDate(searchDate.value);
    console.log(formattedDate);
    // local
    // fetch(`http://localhost:5008/count-box?formattedDate=${encodeURIComponent(formattedDate)}`)
    // global
    fetch(`https://ec2.flaresolution.com/count-box?formattedDate=${encodeURIComponent(formattedDate)}`)
        .then(response => response.json()) // Return the promise from response.json()
        .then(data => {
            console.log("loaded!");
            console.log(data); // Now 'data' contains the parsed JSON object
            updateTableWithData(data); // Call your function to update the table with this data
            stopLoadingAnimation();
        })
        .catch(error => {
            stopLoadingAnimation();
            console.error('Error:', error);
            
            }
        );
}

function formatDate(dateString) {
    let dateParts = dateString.split("-");
    // let year = dateParts[0];
    let month = parseInt(dateParts[1], 10); // Convert to integer and remove leading zeros
    let day = parseInt(dateParts[2], 10); // Convert to integer and remove leading zeros

    return `${month}/${day}`;
}

// countBox();

searchDate.valueAsDate = new Date();
// searchDate.addEventListener("change", countBox);
searchBtn.addEventListener("click", countBox);

// document.addEventListener('DOMContentLoaded', function() {
//     fetch('http://localhost:5007/count-box')
//         .then(response => response.json()) // Return the promise from response.json()
//         .then(data => {
//             console.log(data); // Now 'data' contains the parsed JSON object
//             updateTableWithData(data); // Call your function to update the table with this data
//         })
//         .catch(error => console.error('Error:', error));
// });

function updateTableWithData(data) {

    let cells = document.querySelectorAll('.flex-row:not(:first-child) .flex-cell:not(:first-child)');
    cells.forEach(cell => cell.textContent = '');

    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            let [boxType, quantity] = key.split("_");
            let cellSelector = `.flex-cell[data-box-type="${boxType}"][data-quantity="${quantity}"]`;
            let cell = document.querySelector(cellSelector);
            if (cell) {
                cell.textContent = `${data[key]}명`; // Assuming 'data[key]' contains the count
            }
        }
    }
}




// interval


function startLoadingAnimation() {
    let loadingInterval = "";
    const loadingElement = document.getElementById('loading');
    let dots = 0;
    let date = searchDate.value;
    loadingElement.innerText = date+ `조회중`;
    
    loadingInterval = setInterval(() => {
        dots = (dots + 1) % 4; // Cycle from 0 to 3
        loadingElement.innerText = date + "조회중" + '.'.repeat(dots);
    }, 200); // Update every 200 milliseconds
}

function stopLoadingAnimation() {
    const loadingElement = document.getElementById('loading');
    loadingElement.innerText ="";
    document.getElementById('loading').style.display = 'none';
}