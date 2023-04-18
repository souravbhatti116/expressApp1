
$(document).ready(function(){
    $('.header1').css({
        'text-align': 'center',
        'margin-top': '50px',
        'margin-bottom': '50px'
    });

    $('#table1').css({
        'text-align': 'center',
        'height': '470px',
        'overflow-y':'scroll',

    });

    $('.table th').css({
        'position':'sticky',
        'text-align': 'center',
        });

    $('body').css({
        // 'margin': '5%',
        'background-color':'#151515',
        'color':'aliceblue',
    });

  


    $(document).keypress( async function(e){
        if(e.key == 'Enter'){
            let entry = $('.qrEntry').val();
            let response = await axios.get('http://vmprdate.eastus.cloudapp.azure.com:9000/api/v1/manifest/?qrcode='+ entry);
            let macid = (response.data.data[0].macid);
            let tapeColor = (response.data.data[0].tapeColor);
            let qrCode = (response.data.data[0].qrcode);
            let imei = (response.data.data[0].IMEInumber);
            let firmware = (response.data.data[0].SWrevision);
            let simCard = (response.data.data[0].SIMcard);
            $('tbody').append('<tr id = "data" ><td>'+ entry + '</td> <td>'+ tapeColor +'</td><td>'+ macid +'</td></tr>');
            entry = $('.qrEntry').val(""); 
            csvData.push([qrCode,tapeColor, macid, imei, firmware, simCard ]);
            var count = $("#table1 tr").length; 
            $('#totalNum').html(count - 1);
            console.log(csvData);

        }
    })

    


}
    )

    
var csvData = []

function downloadCsv(){
    var headings = 'QR Code, Product, Mac Id, IMEI, Firmware, Sim Card\n';

    csvData.forEach(function (row) {
        headings += row.join(',');
        headings += '\n';
        })
    
    document.write(headings);
    var hiddenElement = document.createElement('a');  
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(headings);  
    hiddenElement.target = '_blank';  
        
    //provide the name for the CSV file to be downloaded  
    hiddenElement.download = 'MacId_Data.csv';  
    hiddenElement.click();  
    location.reload();

}


    



