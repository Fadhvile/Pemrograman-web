class Category {
    constructor(name) {
        this.name = name;
        this.items = [];
    }

    createItem(id, data) {
        this.items.push({ id, ...data });
        console.log(`${this.name}: Menambahkan`, data);
    }

    readItems() {
        console.log(`${this.name} List:`, this.items);
        return this.items;
    }

    updateItem(id, newData) {
        let item = this.items.find(item => item.id === id);
        if (item) {
            Object.assign(item, newData);
            console.log(`${this.name}: Diperbarui`, item);
        } else {
            console.log(`${this.name}: ID ${id} tidak ditemukan.`);
        }
    }

    deleteItem(id) {
        let index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            let removedItem = this.items.splice(index, 1);
            console.log(`${this.name}: Dihapus`, removedItem[0]);
        } else {
            console.log(`${this.name}: ID ${id} tidak ditemukan.`);
        }
    }
}

class CategoryList extends Category {
    constructor() {
        super("Kategori");
    }
}

class StockList extends Category {
    constructor() {
        super("Stock barang");
    }

    addStock(id, quantity) {
        let item = this.items.find(item => item.id === id);
        if (item) {
            item.stock += quantity;
            console.log(`Stock diperbarui: ${item.name}, Stock baru: ${item.stock}`);
        } else {
            console.log(`ID ${id} Tidak ditemukan.`);
        }
    }
}

class SupplierList extends Category {
    constructor() {
        super("Supplier");
    }
}

// Supplier Transaction List (Tracks stock purchases 
class SupplierTransactionList extends Category {
    constructor() {
        super("Transaksi Supplier");
    }

    // Record a supplier transaction (adding stock)
    recordTransaction(transactionId, supplierId, stockId, quantity, price) {
        this.createItem(transactionId, { supplierId, stockId, quantity, price });
        console.log(`Transaksi Supplier: Stock ${stockId} dari ${supplierId}`);
    }
}

// Customer Transaction List (Tracks product sales)
class CustomerTransactionList extends Category {
    constructor() {
        super("Transaksi Kostumer");
    }

    // Record a customer sale
    recordSale(transactionId, customerId, stockId, quantity, price) {
        this.createItem(transactionId, { customerId, stockId, quantity, price });
        console.log(`Transaksi kostumer: Stock ${stockId} dibeli ${customerId}`);
    }
}

let categories = new CategoryList();
let stocks = new StockList();
let suppliers = new SupplierList();
let supplierTransactions = new SupplierTransactionList();
let customerTransactions = new CustomerTransactionList();

// Pengetesan

// Kategori
categories.createItem(1, { name: "Elektronik" });
categories.createItem(2, { name: "Furnitur" });
categories.readItems();

// Stock
stocks.createItem(101, { name: "Laptop", stock: 10 });
stocks.createItem(102, { name: "Meja", stock: 5 });
stocks.readItems();
stocks.addStock(101, 5);

// suppliers
suppliers.createItem(201, { name: "Tech Supplies.co" });
suppliers.createItem(202, { name: "Furniture World" });
suppliers.readItems();

// Transaksi Suppliers
supplierTransactions.recordTransaction(301, 201, 101, 10, 500);
supplierTransactions.readItems();

// Transaksi Produk
customerTransactions.recordSale(401, "Bayu", 101, 2, 1000);
customerTransactions.readItems();

