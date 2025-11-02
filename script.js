// script.js - lógica separada desde index.html

// Helper: format number as currency with 2 decimals
function fmt(v){ return Number(v).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}); }

function parseNum(v){ return Number((v||0).toString().replace(/[^0-9\.-]+/g,'')) || 0; }

function calculate(){
    // labor
    const laborRows = document.querySelectorAll('#laborRows tr');
    let laborTotal = 0;
    laborRows.forEach((tr, idx) => {
        const h = parseNum(tr.querySelector('input[name^="lab_hours_"]')?.value);
        const r = parseNum(tr.querySelector('input[name^="lab_rate_"]')?.value);
        const amount = h * r;
        const span = tr.querySelector('.lab_amount');
        if(span) span.textContent = fmt(amount);
        laborTotal += amount;
    });

    // materials
    const matRows = document.querySelectorAll('#materialRows tr');
    let matTotal = 0;
    matRows.forEach((tr)=>{
        const q = parseNum(tr.querySelector('input[name^="mat_qty_"]')?.value);
        const p = parseNum(tr.querySelector('input[name^="mat_price_"]')?.value);
        const amount = q * p;
        const span = tr.querySelector('.mat_amount');
        if(span) span.textContent = fmt(amount);
        matTotal += amount;
    });

    const other = parseNum(document.getElementById('otherCost')?.textContent) || 150.00;

    const subtotal = laborTotal + matTotal + other;
    const taxRate = 0.06148; // ejemplo 6.148%
    const taxAmount = subtotal * taxRate;
    const grand = subtotal + taxAmount;

    document.getElementById('totalMaterial').textContent = fmt(matTotal);
    document.getElementById('subtotal').textContent = fmt(subtotal);
    document.getElementById('taxAmount').textContent = fmt(taxAmount);
    document.getElementById('grandTotal').textContent = fmt(grand);
    document.getElementById('taxRate').textContent = (taxRate*100).toFixed(3) + '%';
}

document.addEventListener('DOMContentLoaded', function(){
    const calcBtn = document.getElementById('calcBtn');
    const printBtn = document.getElementById('printBtn');
    if(calcBtn) calcBtn.addEventListener('click', calculate);
    if(printBtn) printBtn.addEventListener('click', function(){ window.print(); });

    // Calculate on load
    calculate();
});
