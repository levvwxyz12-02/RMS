var partPrices = {};

$(function () {
    //Json data by api call for repaired_unit table
    $.get(partListApiUrl, function (response) {
        partPrices = {}
        if(response) {
            var options = '<option value="">--Select--</option>';
            $.each(response, function(index, part) {
                options += '<option value="'+ part.part_id +'">'+ part.name +'</option>';
                partPrices[part.part_id] = part.price_per_part;
            });
            $(".part-box").find("select").empty().html(options);
        }
    });
});

$("#addMoreButton").click(function () {
    var row = $(".part-box").html();
    $(".part-box-extra").append(row);
    $(".part-box-extra .remove-row").last().removeClass('hideit');
    $(".part-box-extra .part-price").last().text('0.0');
    $(".part-box-extra .part-qty").last().val('1');
    $(".part-box-extra .part-total").last().text('0.0');
});

$(document).on("click", ".remove-row", function (){
    $(this).closest('.row').remove();
    calculateValue();
});

$(document).on("change", ".cart-part", function (){
    var part_id = $(this).val();
    var price = partPrices[part_id];

    $(this).closest('.row').find('#part_price').val(price);
    calculateValue();
});

$(document).on("change", ".part-qty", function (e){
    calculateValue();
});

$("#saveRepairedUnit").on("click", function(){
    var formData = $("form").serializeArray();
    var requestPayload = {
        repairer_name: null,
        total: null,
        repaired_details: []
    };
    var RepairedUnitDetails = [];
    for(var i=0;i<formData.length;++i) {
        var element = formData[i];
        var lastElement = null;

        switch(element.name) {
            case 'RepairerName':
                requestPayload.repairer_name = element.value;
                break;
            case 'part_grand_total':
                requestPayload.grand_total = element.value;
                break;
            case 'part':
                requestPayload.repaired_details.push({
                    part_id: element.value,
                    quantity: null,
                    total_price: null
                });                
                break;
            case 'qty':
                lastElement = requestPayload.repaired_details[requestPayload.repaired_details.length-1];
                lastElement.quantity = element.value
                break;
            case 'item_total':
                lastElement = requestPayload.repaired_details[requestPayload.repaired_details.length-1];
                lastElement.total_price = element.value
                break;
        }

    }
    callApi("POST", orderSaveApiUrl, {
        'data': JSON.stringify(requestPayload)
    });
});