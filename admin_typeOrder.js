
async function submitOrder() {
    try {
        startLoadingAnimation();
        const orderData = {
            sheetName: "판매대장",
            product1: document.querySelector("#product1").value,
            product2: document.querySelector("#product2").value,
            product3: document.querySelector("#product3").value,
            product4: document.querySelector("#product4").value,
            product5: document.querySelector("#product5").value,
            productEtc: document.querySelector("#productEtc").value,
            send_name: document.querySelector("#send_name").value,
            send_contact: document.querySelector("#send_contact").value,
            rcv_name: document.querySelector("#rcv_name").value,
            rcv_contact: document.querySelector("#rcv_contact").value,
            rcv_address: document.querySelector("#rcv_address").value,
            reserve_date: formatDate(document.querySelector("#reserve_date").value),
            request_etc: document.querySelector("#request_etc").value,
            request_delivery: document.querySelector("#request_delivery").value,
        };
        console.log(orderData);     
        // global
        const response = await fetch('https://ec2.flaresolution.com/submit-order', {
        // local
        // const response = await fetch('http://localhost:5008/submit-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        hiddenOrder();
        const newOrder = document.querySelector("#newOrder");
        newOrder.style.display = "block";
        stopLoadingAnimation();
    } catch (error) {
        stopLoadingAnimation();
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
    }
}

function hiddenOrder(){

    const orderBox = document.querySelector("#orderBox");
    orderBox.style.marginBottom="0";
    orderBox.innerHTML = "";
    
}


function startLoadingAnimation() {
    let loadingInterval = "";
    const loadingElement = document.getElementById('loading');
    let dots = 0;
    loadingElement.innerText = `전송중`;
    
    loadingInterval = setInterval(() => {
        dots = (dots + 1) % 4; // Cycle from 0 to 3
        loadingElement.innerText = "전송중" + '.'.repeat(dots);
    }, 200); // Update every 200 milliseconds
}

function stopLoadingAnimation() {
    const loadingElement = document.getElementById('loading');
    loadingElement.innerText ="";
    document.getElementById('loading').style.display = 'none';
}


function newOrder(){
        location.reload();
}



function formatDate(dateString) {
    // 현재 연도를 가져옵니다.
    const currentYear = new Date().getFullYear();

    // 주어진 날짜 문자열에 현재 연도를 추가하여 Date 객체 생성
    const date = new Date(`${dateString}/${currentYear}`);

    // 요일을 한글로 변환하는 배열
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

    // 월, 일, 요일 포매팅
    const formattedDate = `${date.getMonth() + 1}월 ${date.getDate()}일(${weekdays[date.getDay()]})`;

    return formattedDate;
}

