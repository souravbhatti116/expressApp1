window.onbeforeunload = function() {
    return "Are you sure you want to leave this page?";
  };



var mac_list = []



function downloadCsv(){
    // Get the table element
    const table = document.getElementById('Good');
    // Get all rows from the table
    const rows = table.querySelectorAll('tr');
    // Create a variable to hold the CSV data
    let csvData = '';
    // Loop through each row and get the data from the cells
    rows.forEach(row => {
        const cells = row.querySelectorAll('td, th');
        let rowData = '';
        // Loop through each cell and format the data as CSV
        cells.forEach(cell => {
            rowData += '"' + cell.innerText.replace(/"/g, '""') + '",';
        });
        // Remove the last comma from the row data
        rowData = rowData.slice(0, -1);
        // Add the row data to the CSV data variable
        csvData += rowData + '\n';
    });
     // Create a Blob object and download the CSV file
     const blob = new Blob([csvData], { type: 'text/csv' });
     const url = URL.createObjectURL(blob);
     const link = document.createElement('a');
     link.setAttribute('href', url);
     link.setAttribute('download', 'myTable.csv');
     link.click();
 
    }


$(document).keypress (async function(e){

    if (e.key == 'Enter') {
        
        try {
            var qrCode = $('#msQr').val();
            var response = await axios.get(`http://vmprdate.eastus.cloudapp.azure.com:9000/api/v1/manifest/?qrcode=${qrCode}`)
            let macid = (response.data.data[0].macid);
            let last2digits = macid.slice(-2)
            let goodCount = $('#Good tr').length;  
            let duplicateCount = $('#Duplicates tr').length;  

            if (mac_list.includes(last2digits)) {
                alert("Duplicate found!");
                $('.duplicates').append('<tr><td>'+ qrCode + ' - ' + last2digits + '</td></tr>');
                $('#duplicateCount').html(duplicateCount);
                
            }
            else{
                mac_list.push(last2digits);
                $('.uniques').append('<tr><td>'+ qrCode + ' - ' + last2digits +'</td></tr>');
                $('#goodCount').html(goodCount);

            }
            console.log(mac_list);
            
            $('#msQr').val(''); 

        } 
        catch (TypeError) 
        {
            $('#msQr').val('');
            alert('Data Does Not Exist.');
        } 
        
    }
    }    

)

async function uploadCsv(){
        var csvFile = document.querySelector('#csvFile');
        var reader = new FileReader();
        reader.readAsText(csvFile.files[0]);

        reader.onload = async function(event){
            var csvData = event.target.result;
            var rowData = csvData.split('\n');
        
            for (let i = 0; i < rowData.length; i++) {

                const element = rowData[i];
                var response = await axios.get(`http://vmprdate.eastus.cloudapp.azure.com:9000/api/v1/manifest/?qrcode=${element}`);
                if (response.data.data == undefined) {
                    continue;
                }   
                let macid = (response.data.data[0].macid);
                let last2digits = macid.slice(-2);
                let goodCount = $('#Good tr').length;  
                let duplicateCount = $('#Duplicates tr').length;  
    
                if (mac_list.includes(last2digits)) {
                    
                    $('.duplicates').append('<tr><td>'+ element + ' - ' + last2digits +'</td></tr>');
                    $('#duplicateCount').html(duplicateCount);
                    
                }
                else{
                    mac_list.push(last2digits);
                    $('.uniques').append('<tr><td>'+ element + ' - ' + last2digits + '</td></tr>');
                    $('#goodCount').html(goodCount);
                }
            }    
                    
            
            
        }

}
var goodnumber = $('#Good tr');
console.log(goodnumber); 
