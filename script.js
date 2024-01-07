// script.js
const a = document.querySelector("#phoneNumber");
const b = document.querySelector("#submit");

function checkPhoneNumber(){
    
    if(a.value.length===3||a.value.length===8){
        a.value+="-";
    }

}


function checkSubmit(){
    let phoneNumber = a.value;
    var regex = /^01(?:0|1|[6-9])[.-]?(\\d{3}|\\d{4})[.-]?(\\d{4})$/;
    if (!regex.test(phoneNumber)) {
        alert('Invalid phone number format');
        return false;
    }
    console.log('Valid phone number');
    return true;
    
}

// a.addEventListener("click",checkPhoneNumber);
// b.addEventListener("click",checkSubmit);

document.getElementById('detailsForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var name = document.getElementById('name').value;
    var phoneNumber = document.getElementById('phoneNumber').value;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:5007/submit?name=' + encodeURIComponent(name) + '&phoneNumber=' + encodeURIComponent(phoneNumber), true);

    xhr.onload = function() {
        if (this.status == 200) {
            document.getElementById('result').innerText = this.responseText;
            
        } else {
            document.getElementById('result').innerText = 'Error fetching data';
        }
    };

    xhr.send();
});







// fetch Test

// function checkOrder() {
//     let name = document.getElementById('name').value;
//     let phoneNumber = document.getElementById('phoneNumber').value;

//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', `http://localhost:5007/check-order?name=${encodeURIComponent(name)}&phoneNumber=${encodeURIComponent(phoneNumber)}`, true);

//     xhr.onload = function() {
//         if (this.status == 200) {
//             let data = JSON.parse(this.responseText);
//             document.getElementById('expected_date').innerText += data.expected_date;
//             document.getElementById('send_name').innerText += data.send_name;
//             document.getElementById('send_contact').innerText += data.send_contact;
//             document.getElementById('rcv_name').innerText += data.rcv_name;
//             document.getElementById('rcv_contact').innerText += data.rcv_contact;
//             document.getElementById('rcv_address').innerText += data.rcv_address;

//             // order list loop
//             console.log(data);
//             for(let i=0;i<data.orderList.length;i++){
//                 let order = "";
//                 if(data.orderList[i]!==""){
//                     order += `${i+1}호 : ${data.orderList[i]}개 \n`;
//                 }
//                 document.getElementById('orderList').innerText += order;
//             }
            
            
//             document.getElementById('totalFee').innerText += data.totalFee;
//         } else {
//             document.getElementById('result').innerText = '오류가 발생하였습니다! 번호를 다시한번 확인해주세요!';
//         }
//     };

//     xhr.send();
// }


function checkOrder() {
    let name = document.getElementById('name').value;
    let phoneNumber = document.getElementById('phoneNumber').value;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', `https://ec2.flaresolution.com/check-order?name=${encodeURIComponent(name)}&phoneNumber=${encodeURIComponent(phoneNumber)}`, true);
    
    xhr.onload = function() {
        if (this.status == 200) {
            let orders = JSON.parse(this.responseText);
            console.log(orders);
            if (orders.error) {
                document.getElementById('result').innerText = orders.error;
            } else {
                displayOrders(orders);
            }
        } else {
            document.getElementById('result').innerText = '오류가 발생하였습니다! 번호를 다시한번 확인해주세요!';
        }
    };

    xhr.send();
}

function displayOrders(orders) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h2>조회하신 결과, 총 ${orders.length}건의 주문이 확인되었습니다!</h2>`;  // Clear previous results and add header
    
    orders.forEach((order, index) => {
        let orderListString = "";
        order.orderList.forEach((item, idx) => {
            if (item !== "") {
                orderListString += `${idx + 1}호 : ${item}개<br>`;
            }
        });
    
        const orderInfo = `
            <div>
                <h4 class="orderHeader">Order ${index + 1}</h4>
                <p>주문자 성함: ${order.send_name}</p>
                <p>휴대폰 번호: ${order.send_contact}</p>
                <p>배송 예약 날짜: ${order.expected_date}</p>
                <p>받는 분 성함: ${order.rcv_name}</p>
                <p>받는 분 연락처: ${order.rcv_contact}</p>
                <p>받는 분 주소: ${order.rcv_address}</p>
                <p>주문 내역:<br> ${orderListString}</p>
                <p>총 금액(배송비 포함): ${order.totalFee}</p>
            </div>
        `;
        resultDiv.innerHTML += orderInfo;
    });
}