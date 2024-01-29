// fetch

// const searchBtn = document.querySelector("#searchBtn");
// const searchDate = document.querySelector("#searchDate");
// set date as today
// searchDate.valueAsDate = new Date();

async function submitOrder() {
    

    try {
        startLoadingAnimation();
        const orderData = {
            product1: document.querySelector("#product1").value,
            product2: document.querySelector("#product2").value,
            product3: document.querySelector("#product3").value,
            product4: document.querySelector("#product4").value,
            product5: document.querySelector("#product5").value,
            send_name: document.querySelector("#send_name").value,
            send_contact: document.querySelector("#send_contact").value,
            rcv_name: document.querySelector("#rcv_name").value,
            rcv_contact: document.querySelector("#rcv_contact").value,
            rcv_address: document.querySelector("#rcv_address").value,
            reserve_date: document.querySelector("#reserve_date").value,
            request_etc: document.querySelector("#request_etc").value,
            request_delivery: document.querySelector("#request_delivery").value
        };
        console.log(orderData);        
        // global
        // const response = await fetch('https://ec2.flaresolution.com/submit-order', {
        // local
        const response = await fetch('http://localhost:5008/submit-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        const data = await response.json();
        console.log(data);

        hiddenOrder()
        const result = document.querySelector("#result");
        result.style.display = "block";
        stopLoadingAnimation();
    } catch (error) {
        stopLoadingAnimation();
        console.error('Error:', error);
    }
}


// copy bank info
function copy_bankInfo() {

    const copyText = "농협 352-1386-3306-83";
    navigator.clipboard.writeText(copyText).then(function(){
        alert( copyText +  "\n가 복사되었습니다!");
    })


}



function reviewOrder(){
    const orderReview = document.querySelector(".orderReview");
    const product1 = document.querySelector("#product1").value;
    const product2 = document.querySelector("#product2").value;
    const product3 = document.querySelector("#product3").value;
    const product4 = document.querySelector("#product4").value;
    const product5 = document.querySelector("#product5").value;
    let price = calculate_price(product1,product2,product3,product4,product5);

    const orderList = [product1,product2,product3,product4,product5];
    let orderListString ="";

    orderList.map((item,idx)=>{
        if(item!=="0"){
            orderListString+= `${idx + 1}번 선물세트 : ${item}개<br>`;
        }
        return orderListString;
    })
    
    const order = {
        send_name: document.querySelector("#send_name").value,
        send_contact: document.querySelector("#send_contact").value,
        rcv_name: document.querySelector("#rcv_name").value,
        rcv_contact: document.querySelector("#rcv_contact").value,
        rcv_address: document.querySelector("#rcv_address").value,
        reserve_date: document.querySelector("#reserve_date").value,
        request_etc: document.querySelector("#request_etc").value,
        request_delivery: document.querySelector("#request_delivery").value
    };
    const orderInfo = `
            <div>
                <p>주문자 성함: ${order.send_name}</p>
                <p>휴대폰 번호: ${order.send_contact}</p>
                <p id="expected_date">출고 예정일 : ${order.reserve_date}<br>
                    (택배 도착일이 아닌 <strong>"발송일"</strong>지정 예약입니다.)<br>- 보통 영업일 기준 1~2일 후 도착합니다.
                </p>
                <p>받는 분 성함: ${order.rcv_name}</p>
                <p>받는 분 연락처: ${order.rcv_contact}</p>
                <p>받는 분 주소: ${order.rcv_address}</p>
                <p>주문 내역:<br> ${orderListString}</p>
                <p>총 금액(배송비 포함): ${price}</p>
            </div>
        `;
        orderReview.innerHTML += orderInfo;

    const totalFee = document.querySelector("#totalFee");
    totalFee.innerHTML = "예상금액 = "+ price;
    
}


function calculate_price(item1,item2,item3,item4,item5){
    let price =0;
    price = item1*32000+item2*43000+item3*63000+item4*85000+item5*110000;
    if(price>=50000){
        price-=4000;
    }
    return price;
}


// submit-> reset
function hiddenOrder(){

    reviewOrder();

    const orderBox = document.querySelector("#orderBox");

    orderBox.innerHTML = "";

    

}




// update price
function update_price(){
    

    let product1 = document.querySelector("#product1").value;
    let product2 = document.querySelector("#product2").value;
    let product3 = document.querySelector("#product3").value;
    let product4 = document.querySelector("#product4").value;
    let product5 = document.querySelector("#product5").value;
    const priceTag = document.querySelector("#priceTag");
    if(priceTag.classList.contains("none")){
        priceTag.classList.remove("none");
    }
    priceTag.innerHTML = "현재 금액 = "+ calculate_price(product1,product2,product3,product4,product5) +"원<br> (50000원 이상 무료배송)";
}

let product1 = document.querySelector("#product1");
let product2 = document.querySelector("#product2");
let product3 = document.querySelector("#product3");
let product4 = document.querySelector("#product4");
let product5 = document.querySelector("#product5");

product1.addEventListener("oninput",update_price);
product2.addEventListener("oninput",update_price);
product3.addEventListener("oninput",update_price);
product4.addEventListener("oninput",update_price);



// loading

function startLoadingAnimation() {
    let loadingInterval = "";
    const loadingElement = document.getElementById('loading');
    let dots = 0;
    loadingElement.innerText = `조회중`;
    
    loadingInterval = setInterval(() => {
        dots = (dots + 1) % 4; // Cycle from 0 to 3
        loadingElement.innerText = "조회중" + '.'.repeat(dots);
    }, 200); // Update every 200 milliseconds
}

function stopLoadingAnimation() {
    const loadingElement = document.getElementById('loading');
    loadingElement.innerText ="";
    document.getElementById('loading').style.display = 'none';
}