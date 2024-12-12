let loanAmount = document.getElementById("loanAmount");
let rateOfInterest = document.getElementById("rateOfInterest");
let loanTenure = document.getElementById("loanTenure");

function updateValues() {
    document.getElementById("loanAmountValue").innerText = `₹ ${loanAmount.value}`;
    document.getElementById("rateOfInterestValue").innerText = `${rateOfInterest.value}%`;
    document.getElementById("loanTenureValue").innerText = `${loanTenure.value} Yr`;

    calculateEMI();
}

function updateValuesFromSlider(id) {
    const slider = document.getElementById(id);
    const input = document.getElementById(`${id}Input`);
    const valueSpan = document.getElementById(`${id}Value`);

    input.value = slider.value;

    if (id === "loanAmount") valueSpan.innerText = `₹ ${slider.value}`;
    else if (id === "rateOfInterest") valueSpan.innerText = `${slider.value}%`;
    else if (id === "loanTenure") valueSpan.innerText = `${slider.value} Yr`;

    calculateEMI();
}

function updateValuesFromInput(id) {
    const input = document.getElementById(`${id}Input`);
    const slider = document.getElementById(id);
    const valueSpan = document.getElementById(`${id}Value`);

    // Ensure input value stays within valid range
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);
    if (input.value < min) input.value = min;
    if (input.value > max) input.value = max;

    slider.value = input.value;

    if (id === "loanAmount") valueSpan.innerText = `₹ ${input.value}`;
    else if (id === "rateOfInterest") valueSpan.innerText = `${input.value}%`;
    else if (id === "loanTenure") valueSpan.innerText = `${input.value} Yr`;

    calculateEMI();
}

function calculateEMI() {
    const data = {
        principal: parseInt(loanAmount.value),
        rate: parseFloat(rateOfInterest.value),
        tenure: parseInt(loanTenure.value),
    };

    fetch("/calculate_emi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(result => {
            document.getElementById("monthlyEMI").innerText = `₹ ${result.emi}`;
            document.getElementById("principalAmount").innerText = data.principal;
            document.getElementById("totalInterest").innerText = result.total_interest;
            document.getElementById("totalAmount").innerText = result.total_amount;

            
        });
}



updateValues();
