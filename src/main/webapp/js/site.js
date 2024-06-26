﻿document.addEventListener( 'DOMContentLoaded', () => {
    // шукаємо кнопку реєстрації, якщо знаходимо - додаємо обробник
    const signupButton = document.getElementById("signup-button");
    if(signupButton) { signupButton.onclick = signupButtonClick; }
    // шукаємо кнопку автентифікації, якщо знаходимо - додаємо обробник
    const authButton = document.getElementById("auth-button");
    if(authButton) { authButton.onclick = authButtonClick; }
    const productButton = document.getElementById("add-product-form");
    if(productButton) { productButton.onclick = productButtonButtonClick; }
    // налаштування модальних вікон
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {
        "opacity": 	    	0.5, 	// Opacity of the modal overlay.
        "inDuration": 		250, 	// Transition in duration in milliseconds.
        "outDuration": 		250, 	// Transition out duration in milliseconds.
        "onOpenStart": 		null,	// Callback function called before modal is opened.
        "onOpenEnd": 		null,	// Callback function called after modal is opened.
        "onCloseStart":		null,	// Callback function called before modal is closed.
        "onCloseEnd": 		null,	// Callback function called after modal is closed.
        "preventScrolling": true,	// Prevent page from scrolling while modal is open.
        "dismissible": 		true,	// Allow modal to be dismissed by keyboard or overlay click.
        "startingTop": 		'4%',	// Starting top offset
        "endingTop": 		'10%'	// Ending top offset
    });
    checkAuth();

});
function serveCartButtons() {
    // шукаємо id користувача (з його аватарки)
    const userId = document.querySelector('[data-user-id]').getAttribute('data-user-id');
    // шукаємо всі кнопки "додати до кошику" за ознакою data-product="..."
    for( let btn of document.querySelectorAll('[data-product]') ) {
        btn.onclick = () => {
            // вилучаємо id з атрибута
            let productId = btn.getAttribute('data-product');
            // при натисненні надсилаємо запит до API
            fetch(`/${getContext()}/shop-api?user-id=${userId}&product-id=${productId}`, {
                method: 'PUT'
            }).then(r => r.json()).then(console.log);

        }
    }



}
function checkAuth() {
    // ... при завантаженні сторінки перевіряємо наявність даних автентифікації у localStorage
    const authToken = localStorage.getItem("auth-token");
    if( authToken ) {
        // перевіряємо токен на валідність і одержуємо дані про користувача
        fetch(`/${getContext()}/auth?token=${authToken}`, {
            method: 'POST'
        })
            .then( r => r.json() )
            .then( j => {
                if(j.meta.status == 'success') {
                    // замінити "кнопку" входу на аватарку користувача
                    document.querySelector('[data-auth="avatar"]').innerHTML = `<img data-user-id="${j.data.id}" title="${j.data.name}" class="nav-avatar" src="/${getContext()}/img/avatar/${j.data.avatar}" />`
                    const product = document.querySelector('[data-auth="product"]');
                    if(product) {
                        fetch(`/${getContext()}/product.jsp`)
                            .then(r => r.text())
                            .then(t => {
                                product.innerHTML = t;
                                document.getElementById("add-product-button")
                                    .addEventListener('click', addProductClick);
                            });
                    }
                    serveCartButtons();
                }
                else {
                    document.querySelector('[data-auth="avatar"]').innerHTML =   '<a href="#auth-modal" class="modal-trigger"><i class="material-icons">key</i></a>'
                }
            } );
    }
}

function addProductClick(e) {
    // Збираємо дані з форми додавання продукту
    const form = e.target.closest('form');
    const name = form.querySelector("#product-name").value.trim();
    const price = Number(form.querySelector("#product-price").value);
    const description = form.querySelector("#product-description").value.trim();
    const fileInput = form.querySelector("#product-img");
    // Проводимо валідацію
    let valid = true;

    if (name.length < 3) {
        form.querySelector("#product-name-error").innerText = "Назва товару повинна містити принаймні 3 символів";
        valid = false;
    }
    else
    {
        form.querySelector("#product-name-error").innerText = "";
    }

    if (price <= 0 || isNaN(price)) {
        form.querySelector("#product-price-error").innerText = "Ціна товару повинна бути додатнім числом";
        valid = false;
    }
    else
    {
        form.querySelector("#product-price-error").innerText = "";
    }


    if (description.length > 20) {
        form.querySelector("#product-description-error").innerText = "Опис товару не повинен містити більше 20 символів";
        valid = false;
    }
    else
    {
        form.querySelector("#product-description-error").innerText = "";
    }


    if (fileInput.files.length > 0) {
        const dotPosition = fileInput.value.lastIndexOf('.');
        const ext = fileInput.value.substring(dotPosition).toLowerCase();
        const allowedExtensions = [".jpg", ".jpeg", ".png"];

        if (!allowedExtensions.includes(ext)) {
            const imgErrorSpan = form.querySelector("#product-img-error");
            if (imgErrorSpan) {
                imgErrorSpan.innerText = "Дозволені розширення зображення - .jpg, .jpeg, .png";
            }
            valid = false;
        }
        else
        {
            form.querySelector("#product-img-error").innerText = "";
        }
    } else {
        const imgErrorSpan = form.querySelector("#product-img-error");
        if (imgErrorSpan) {
            imgErrorSpan.innerText = "Файл зображення не обрано";
        }
        valid = false;
    }

    const token = localStorage.getItem("auth-token");
    if(token == null) {
        const tokenErrorDiv = document.getElementById('token-error');
        if(tokenErrorDiv) {
            tokenErrorDiv.innerText = 'Error 401/403';
        }
        valid = false;
    }

    // Формуємо дані для передачі на сервер
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", fileInput.files[0]);
    formData.append("token", localStorage.getItem("auth-token"));
    // надсилаємо дані
    fetch(`/${getContext()}/shop-api`, {
        method: 'POST',
        body: formData
    })
        .then( r => r.json() )
        .then( console.log );
}

function productButtonButtonClick()
{

    // шукаємо форму - батьківській елемент кнопки (e.target)
    const productForm = document.getElementById('add-product-form');
    if( ! productForm ) {
        throw "productForm form not found" ;
    }
    // всередині форми signupForm знаходимо елементи
    const productNameInput = productForm.querySelector('input[name="product-name"]');
    if( ! productNameInput ) { throw "productNameInput not found" ; }
    const productPriceInput = productForm.querySelector('input[name="product-price"]');
    if( ! productPriceInput ) { throw "productPriceInput not found" ; }
    const productDescriptionInput = productForm.querySelector('textarea[name="product-description"]');
    if( ! productDescriptionInput ) { throw "productDescriptionInput not found" ; }
    const productPhotoInput = productForm.querySelector('input[name="product-photo"]');
    if( ! productPhotoInput ) { throw "productPhotoInput not found" ; }

    /// Валідація даних
    let isFormValid = true ;

        if( productNameInput.value === "" ) {
            productNameInput.classList.remove("valid");
            productNameInput.classList.add("invalid");
            isFormValid = false ;
        }
        else {
            productNameInput.classList.remove("invalid");
            productNameInput.classList.add("valid");
        }
        if( ! isFormValid ) return ;
    if( productPriceInput.value === "" ) {
        productPriceInput.classList.remove("valid");
        productPriceInput.classList.add("invalid");
        isFormValid = false ;
    }
    else {
        productPriceInput.classList.remove("invalid");
        productPriceInput.classList.add("valid");
    }
    if( ! isFormValid ) return ;

    if( productDescriptionInput.value === "" ) {
        productDescriptionInput.classList.remove("valid");
        productDescriptionInput.classList.add("invalid");
        isFormValid = false ;
    }
    else {
        productDescriptionInput.classList.remove("invalid");
        productDescriptionInput.classList.add("valid");
    }
    if( ! isFormValid ) return ;

        /// кінець валідації

    // формуємо дані для передачі на бекенд
    const formData = new FormData() ;
    formData.append( "product-name", productNameInput.value ) ;
    formData.append( "product-price", productPriceInput.value ) ;
    formData.append( "product-description", productDescriptionInput.value ) ;
    if( productPhotoInput.files.length > 0 ) {
        formData.append( "product-photo", productPhotoInput.files[0] ) ;
    }

    // передаємо - формуємо запит
    fetch( window.location.href, { method: 'POST', body: formData } )
        .then( r => r.json() )
        .then( j => {
            console.log(j);
            /* if( j.status == 1 ) {  // реєстрація успішна
                alert( 'реєстрація успішна' ) ;
                window.location = '/' ;  // переходимо на головну сторінку
            }
            else {  // помилка реєстрації (повідомлення - у полі message)
                alert( j.data.message ) ;
            } */
        } ) ;

}
function getContext() {
    return window.location.pathname.split('/')[1];
}
function authButtonClick(e) {
    const emailInput = document.querySelector('input[name="auth-email"]');
    if( ! emailInput ) { throw "'auth-email' not found" ; }
    const passwordInput = document.querySelector('input[name="auth-password"]');
    if( ! passwordInput ) { throw "'auth-password' not found" ; }

    // console.log( emailInput.value, passwordInput.value ) ;
    fetch(`/${getContext()}/auth?email=${emailInput.value}&password=${passwordInput.value}`, {
        method: 'GET'
    })
        .then( r => r.json() )
        .then( j => {
            if( j.data == null || typeof j.data.token == "undefined" ) {
                document.getElementById("modal-auth-message").innerText = "У вході відмовлено";
            }
            else {
                // авторизація токенами передбачає їх збереження з метою подальшого використання
                // Для того щоб токени були доступні після перезавантаження їх вміщують
                // до постійного сховища браузера - localStorage ...
                localStorage.setItem("auth-token", j.data.token);
                window.location.reload();
            }
        } ) ;
}

function signupButtonClick(e) {
    // шукаємо форму - батьківській елемент кнопки (e.target)
    const signupForm = e.target.closest('form') ;
    if( ! signupForm ) {
        throw "Signup form not found" ;
    }
    // всередині форми signupForm знаходимо елементи
    const nameInput = signupForm.querySelector('input[name="user-name"]');
    if( ! nameInput ) { throw "nameInput not found" ; }
    const emailInput = signupForm.querySelector('input[name="user-email"]');
    if( ! emailInput ) { throw "emailInput not found" ; }
    const passwordInput = signupForm.querySelector('input[name="user-password"]');
    if( ! passwordInput ) { throw "passwordInput not found" ; }
    const repeatInput = signupForm.querySelector('input[name="user-repeat"]');
    if( ! repeatInput ) { throw "repeatInput not found" ; }
    const avatarInput = signupForm.querySelector('input[name="user-avatar"]');
    if( ! avatarInput ) { throw "avatarInput not found" ; }
    const errorDiv = document.querySelector('.errorDiv');
    if (!errorDiv) {
        throw "errorDiv not found";
    }

    /// Валідація даних
    let isFormValid = true ;

    if( nameInput.value === "" ) {
        nameInput.classList.remove("valid");
        nameInput.classList.add("invalid");
        isFormValid = false ;
    }
    else {
        nameInput.classList.remove("invalid");
        nameInput.classList.add("valid");
    }

    if( emailInput.value === "" ) {
        emailInput.classList.remove("valid");
        emailInput.classList.add("invalid");
        isFormValid = false ;
    }
    else {
        emailInput.classList.remove("invalid");
        emailInput.classList.add("valid");
    }

    if( passwordInput.value === "" ) {
        passwordInput.classList.remove("valid");
        passwordInput.classList.add("invalid");
        isFormValid = false ;
    }
    else {
        passwordInput.classList.remove("invalid");
        passwordInput.classList.add("valid");
    }

    if( repeatInput.value === "" || passwordInput.value !== repeatInput.value) {
        repeatInput.classList.remove("valid");
        repeatInput.classList.add("invalid");
        isFormValid = false ;
    }
    else {
        repeatInput.classList.remove("invalid");
        repeatInput.classList.add("valid");
    }

    if( ! isFormValid ) {
        passwordInput.value = '';
        repeatInput.value = '';
        errorDiv.style.display = "block";
        errorDiv.style.border = "2px solid purple;"
        errorDiv.style.font = "16px";
        errorDiv.style.height = "30px";
        errorDiv.textContent = "Виникли помилки реєстрації. Будь ласка спробуйте ще раз!";
        return ;
    }

    // формуємо дані для передачі на бекенд
    const formData = new FormData() ;
    formData.append( "user-name", nameInput.value ) ;
    formData.append( "user-email", emailInput.value ) ;
    formData.append( "user-password", passwordInput.value ) ;
    if( avatarInput.files.length > 0 ) {
        formData.append( "user-avatar", avatarInput.files[0] ) ;
    }

    // передаємо - формуємо запит
    fetch( window.location.href, { method: 'POST', body: formData } )
        .then( r => r.json() )
        .then( j => {
            console.log(j);
             if( j.meta.status === "success") {  // реєстрація успішна
                alert( "реєстрація успішна" ) ;
                 window.location = '/Java_Shop/'; // переходимо на головну сторінку
                 console.log("Success");
             }
            else {  // помилка реєстрації (повідомлення - у полі message)
                alert( j.data.message + " не зареєстровано" ) ;
                 errorDiv.textContent += j.data.message;
                 console.error("Error during registration:", j.data.message);
            }
        } ) ;
}