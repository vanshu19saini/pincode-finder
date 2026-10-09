let fullAddress = "";
async function checkPincode() {
    let pincode = document.getElementById("pincodeInput").value;
    let resultDiv = document.getElementById("result");
    if(pincode.length !== 6) {
        alert("6 digit ka pincode daalo yarr");
        return;
    }
    resultDiv.style.display = "block";
    resultDiv.innerHTML = "Loading...";
    try {
        let res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        let data = await res.json();
        if (data[0].Status === "Error") {
            resultDiv.innerHTML = "X ye pincode galat hai!";
            return;
        }
        let office = data[0].PostOffice[0];
            
        fullAddress = `${office.Name}, ${office.District}, ${office.State} - ${pincode}`;
        resultDiv.innerHTML = `
        <b> Mil Gaya!</b><br><br>
        <b> Area:</b> ${office.Name}<br>
        <b> DiStrict:</b> ${office.District}<br>
        <b> State:</b> ${office.State}<br>
        <b> Country:</b> ${office.Country}<br>
        <div style="margin-top:15px; display:flex; justify-content:center; ">
        <button style="background-color:black; color:white; width:100% padding:14px; border-radius:12px; border:none; font-size:16px; font-weight:bold; "  onclick="copyAddress()"> Copy Adress </button>
        </div>
        `;
    } catch (error) {
        resultDiv.innerHTML = "Internet nahi hai ya server down hai";
    }
}
function copyAddress() {
    navigator.clipboard.writeText(fullAddress);
    alert("Copy ho gya: " + fullAddress);
}