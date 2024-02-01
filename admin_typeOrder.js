
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
            send_contact: document.querySelector("#send_contact").value.replaceAll("-",""),
            rcv_name: document.querySelector("#rcv_name").value,
            rcv_contact: document.querySelector("#rcv_contact").value.replaceAll("-",""),
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

        // hiddenOrder();
        
        const newOrder = document.querySelector("#newOrder");
        newOrder.style.display = "block";
        stopLoadingAnimation();
        resetOrder();
    } catch (error) {
        stopLoadingAnimation();
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
    }
}

function hiddenOrder(){

    // const orderBox = document.querySelector("#orderBox");
    // orderBox.style.marginBottom="0";
    // orderBox.innerHTML = "";
    
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


function resetOrder(){

    let answer = window.confirm("새 주문을 시작합니다! 발송인이 같은 분이실까요?")
    if(answer){
        // alert("A");
        document.querySelector("#product1").value="";
        document.querySelector("#product2").value="";
        document.querySelector("#product3").value="";
        document.querySelector("#product4").value="";
        document.querySelector("#product5").value="";
        document.querySelector("#productEtc").value="";
        // document.querySelector("#send_name").value="";
        // document.querySelector("#send_contact").value="";
        document.querySelector("#rcv_name").value="";
        document.querySelector("#rcv_contact").value="";
        document.querySelector("#rcv_address").value="";
        document.querySelector("#reserve_date").value="";
        document.querySelector("#request_etc").value="";
        document.querySelector("#request_delivery").value="";
    }else{
        // alert("B");
        document.querySelector("#product1").value="";
        document.querySelector("#product2").value="";
        document.querySelector("#product3").value="";
        document.querySelector("#product4").value="";
        document.querySelector("#product5").value="";
        document.querySelector("#productEtc").value="";
        document.querySelector("#send_name").value="";
        document.querySelector("#send_contact").value="";
        document.querySelector("#rcv_name").value="";
        document.querySelector("#rcv_contact").value="";
        document.querySelector("#rcv_address").value="";
        document.querySelector("#reserve_date").value="";
        document.querySelector("#request_etc").value="";
        document.querySelector("#request_delivery").value="";
    }
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



// image OCR

async function imageText() {
    const fileInput = document.querySelector('#imageUpload');
    if(fileInput.files.length === 0) {
        alert("Please select a file first.");
        return;
    }
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch(`https://ec2.flaresolution.com/image-text`, {
        // const response = await fetch('http://localhost:5008/image-text', {
            method: 'POST',
            body: formData,
        });
        if(!response.ok) throw new Error('Network response was not ok.');
        const data = await response.json();
        console.log(data);

        document.querySelector("#tempText").innerHTML = data;
    } catch (error) {
        console.error('Error:', error);
        alert("Failed to analyze the image.");
    }
}