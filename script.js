
// Product class
class Product {
    constructor(id, name, price, quantity) {
        this.id = id;
        this.name = name;
        this.price = parseFloat(price);
        this.quantity = parseInt(quantity);
    }
}

// Inventory class
class Inventory {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
    }

    calculateTotalValue() {
        let totalValue = 0;
        for (const product of this.products) {
            totalValue += product.price * product.quantity;
        }
        return totalValue.toFixed(2);
    }

    displayProducts() {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';
        for (const product of this.products) {
            productList.innerHTML += `<p>${product.name} - Price: ${product.price} - Quantity: ${product.quantity}</p>`;
        }
        document.getElementById('total-value').textContent = this.calculateTotalValue();
    }
}

// Initialize the inventory
const inventory = new Inventory();

// Form submission handler
document.getElementById('add-product-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    const productQuantity = document.getElementById('product-quantity').value;

    // Create a new product and add it to the inventory
    const productId = inventory.products.length + 1; // Simple ID generation
    const product = new Product(productId, productName, productPrice, productQuantity);
    inventory.addProduct(product);

    // Display updated inventory
    inventory.displayProducts();

    // Clear the form fields
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-quantity').value = '';
});

// Function to print the bill
function printBill() {
    const billWindow = window.open('', '', 'width=500,height=500');
    billWindow.document.write('<html><head><title>Bill</title></head><body>');
    billWindow.document.write('<h2>Bill</h2>');
    billWindow.document.write('<ol>');
    
    for (const product of inventory.products) {
        billWindow.document.write(`<li>${product.name} - ₹${product.price.toFixed(2)} x ${product.quantity} = ₹${(product.price * product.quantity).toFixed(2)}</li>`);
    }
    
    billWindow.document.write('</ol>');
    billWindow.document.write(`<p>Total: ₹${inventory.calculateTotalValue()}</p>`);
    billWindow.document.write('</body></html>');
    billWindow.document.close();
}

// Attach a click event listener to the "Print Bill" button
document.getElementById('print-bill-button').addEventListener('click', printBill);

