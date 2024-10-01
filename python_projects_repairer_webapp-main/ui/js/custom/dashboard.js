$(function () {
    //Json data by api call for order table
    $.get(repairedunitListApiUrl, function (response) {
        if(response) {
            var table = '';
            var totalCost = 0;
            $.each(response, function(index, unit) {
                totalCost += parseFloat(unit.total);
                table += '<tr>' +
                    '<td>'+ unit.datetime +'</td>'+
                    '<td>'+ unit.unit_id +'</td>'+
                    '<td>'+ unit.repairer_name +'</td>'+
                    '<td>'+ unit.total.toFixed(2) +' Rs</td></tr>';
            });
            table += '<tr><td colspan="3" style="text-align: end"><b>Total</b></td><td><b>'+ totalCost.toFixed(2) +' Rs</b></td></tr>';
            $("table").find('tbody').empty().html(table);
        }
    });
});