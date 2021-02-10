// Clase de producto: Asi es como va a estar organizado internamente la clase Product, que a su vez va a 
// crear objetos heredando sus mismas propiedades.

class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

// Class UserInterfase: Esta clase va a estar destinada a interactuar con el html (DOM), 
// dentro estan los metodos. 

class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
        <div class="card text.center mb-4">
            <div class="card-body">
                <strong>Product Name</strong>: ${product.name}
                <strong>Product Price</strong>: ${product.price}
                <strong>Product Year</strong>: ${product.year}
                <a href="#" class="btn btn-danger" name="delete">Delete</a>
            </div>
        </div>
        `;
        productList.appendChild(element);

    }

    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProduct(element) {
        if(element.name === 'delete'){
            element.parentElement.parentElement.parentElement.remove();
            this.showMessege('Product Delete Successfully', 'danger');
        }  

    }

    showMessege(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        // Showing in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app); // Container seria la ubicacion general, 
        setTimeout(function(){          //app seria el elemento hijo de div. Se leeria "por encima de ' ' ". 
            document.querySelector('.alert').remove();
        },3000); // Son milisegundos.
        console.log(div);
    }

    obtenerProductos(){
        //Le pide los datos al servidor y los muestra por pantalla.
    }
}

// DOM Events

document.getElementById('product-form')
    .addEventListener('submit', function(e) { // Evento submit. Repasar addEventListener
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;

        const product = new Product(name, price, year);
        console.log(product);

        const ui = new UI();

        if(name === '' || price === '' || year === '' ){
            return ui.showMessege('Complete Fields Please', 'info');
            
        }

        ui.addProduct(product);

        ui.showMessege('Product Added Successfully', 'success');

        ui.resetForm();

        e.preventDefault();

        console.log();
});

document.getElementById('product-list')
    .addEventListener('click', function(e){
        const ui = new UI();
        ui.deleteProduct(e.target);
        console.log(e.target);
    });


