var partModel = $("#partModel");
    $(function () {

        //JSON data by API call
        $.get(partListApiUrl, function (response) {
            if(response) {
                var table = '';
                $.each(response, function(index, part) {
                    table += '<tr data-id="'+ part.part_id +'" data-name="'+ part.name +'" data-unit="'+ part.model_id +'" data-price="'+ part.price_per_part +'">' +
                        '<td>'+ part.name +'</td>'+
                        '<td>'+ part.model_name +'</td>'+
                        '<td>'+ part.price_per_part +'</td>'+
                        '<td><span class="btn btn-xs btn-danger delete-part">Delete</span></td></tr>';
                });
                $("table").find('tbody').empty().html(table);
            }
        });
    });

    // Save Part
    $("#savePart").on("click", function () {
        // If we found id value in form then update part detail
        var data = $("#partForm").serializeArray();
        var requestPayload = {
            part_name: null,
            model_id: null,
            price_per_part: null
        };
        for (var i=0;i<data.length;++i) {
            var element = data[i];
            switch(element.name) {
                case 'name':
                    requestPayload.part_name = element.value;
                    break;
                case 'uoms':
                    requestPayload.model_id = element.value;
                    break;
                case 'price':
                    requestPayload.price_per_part = element.value;
                    break;
            }
        }
        callApi("POST", partSaveApiUrl, {
            'data': JSON.stringify(requestPayload)
        });
    });

    $(document).on("click", ".delete-part", function (){
        var tr = $(this).closest('tr');
        var data = {
            part_id : tr.data('id')
        };
        var isDelete = confirm("Are you sure to delete "+ tr.data('name') +" item?");
        if (isDelete) {
            callApi("POST", partDeleteApiUrl, data);
        }
    });

    partModel.on('hide.bs.model', function(){
        $("#id").val('0');
        $("#name, #unit, #price").val('');
        partModel.find('.model-title').text('Add New Part');
    });

    partModel.on('show.bs.model', function(){
        //JSON data by API call
        $.get(modelListApiUrl, function (response) {
            if(response) {
                var options = '<option value="">--Select--</option>';
                $.each(response, function(index, model) {
                    options += '<option value="'+ model.model_id +'">'+ model.model_name +'</option>';
                });
                $("#models").empty().html(options);
            }
        });
    });