// Define your api here
var partListApiUrl = 'http://127.0.0.1:5000/getParts';
var modelListApiUrl = 'http://127.0.0.1:5000/getModel';
var partSaveApiUrl = 'http://127.0.0.1:5000/insertPart';
var partDeleteApiUrl = 'http://127.0.0.1:5000/deletePart';
var repairedunitListApiUrl = 'http://127.0.0.1:5000/getAllRepairedUnit';
var repairedunitSaveApiUrl = 'http://127.0.0.1:5000/insertRepairedUnit';

// For product drop in repaired unit
var partsApiUrl = 'https://fakestoreapi.com/products';

function callApi(method, url, data) {
    $.ajax({
        method: method,
        url: url,
        data: data
    }).done(function( msg ) {
        window.location.reload();
    });
}

function calculateValue() {
    var total = 0;
    $(".part-item").each(function( index ) {
        var qty = parseFloat($(this).find('.part-qty').val());
        var price = parseFloat($(this).find('#part_price').val());
        price = price*qty;
        $(this).find('#item_total').val(price.toFixed(2));
        total += price;
    });
    $("#part_grand_total").val(total.toFixed(2));
}

function orderParser(repaired_unit) {
    return {
        id : unit.id,
        date : repaired_unit.repairer_name,
        orderNo : repaired_unit.repairer_name,
        customerName : repaired_unit.repairer_name,
        cost : parseInt(repaired_unit.salary)
    }
}

function partParser(part) {
    return {
        id : part.id,
        name : part.employee_name,
        unit : part.employee_name,
        price : part.employee_name
    }
}

function partDropParser(part) {
    return {
        id : part.id,
        name : part.title
    }
}

//To enable bootstrap tooltip globally
// $(function () {
//     $('[data-toggle="tooltip"]').tooltip()
// });