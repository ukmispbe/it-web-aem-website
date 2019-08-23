function skuQuantityInput(e) {
    let value = e.target.value;
    if ((value.length > 3) || (value > 999)) {
        value = 999;
    }
    e.target.value = value;
}

function skuRemoveNegative(e) {
    e = e || window.event;
    let charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    let charStr = String.fromCharCode(charCode);

    // 45 = '-' sign,  48 = '0' Don't allow minus sign or leading zero
    if ((charCode === 45) || (charCode === 48 && e.target.value.length === 0)) {
        e.preventDefault();
        return;
    }

    // In for FireFox
    if (!charStr.match(/^[0-9]$/)) {
        e.preventDefault();
        return;
    }
}

var quantitySkuList = document.getElementsByClassName("cmp-sku-list__quantity");
if (quantitySkuList) {
    for (var i = 0; i < quantitySkuList.length; i++) {
        quantitySkuList[i].addEventListener('keyup', () => skuQuantityInput(event));
        quantitySkuList[i].addEventListener('keypress', () => skuRemoveNegative(event));
    }
}


export default {
    SkuRemoveNegative: skuRemoveNegative,
    SkuQuantityInput: skuQuantityInput,

};
