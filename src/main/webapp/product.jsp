﻿<meta charset="UTF-8">﻿
<h1>Додати новий товар</h1>

<form method="post" id="add-product-form">
    <div class="row">
        <div class="col s12">
            <div class="row">

                <div class="input-field col s12 m6">
                    <input id="product-name" name="product-name" type="text" class="validate">
                    <label for="product-name">Назва товару</label>
                    <span class="helper-text" data-error="wrong" style="color:red;" id="product-name-error"></span>
                </div>

                <div class="input-field col s12 m6">
                    <input id="product-price" name="product-price" type="number" class="validate">
                    <label for="product-price">Ціна товару</label>
                    <span class="helper-text" data-error="wrong" style="color:red;" id="product-price-error"></span>
                </div>

                <div class="input-field col s12 m12">
                    <textarea id="product-description" name="product-description" class="materialize-textarea"></textarea>
                    <label for="product-description">Опис товару</label>
                    <span class="helper-text" data-error="wrong" style="color:red;" id="product-description-error"></span>
                </div>

                <div class="file-field input-field col s12 m6">
                    <div class="btn light-blue lighten-4 right">
                        <span>Зображення товару</span>
                        <input id="product-img" name="product-img" type="file">
                    </div>
                    <div class="file-path-wrapper">
                        <input  id="product-img-path" class="file-path validate" type="text">
                    </div>
                    <span class="helper-text" data-error="wrong" style="color:red;" id="product-img-error"></span>
                </div>
            </div>
            <div>
                <div class="input-field col s12 m6">
                    <span class="helper-text" data-error="wrong" style="color:red;" id="token-error"></span>
                </div>
            </div>
            <div class="row">
                <div class="col s12 m12 center">
                    <button type="button" class="btn light-blue lighten-4 right" id="add-product-button">Зберегти</button>
                    <div id="add-product-result"></div>
                </div>
            </div>
        </div>
    </div>

</form>