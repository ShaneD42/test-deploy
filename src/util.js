// Adding Dollar Sign to Services List 

export default function formatCurrency(num) {
    return "$" + Number(num.toFixed(1)).toLocaleString() + " ";
}