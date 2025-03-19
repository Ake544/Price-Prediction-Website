function getBathValue() {
    var uiBathrooms = document.getElementsByName('uiBathrooms');
    for (var i in uiBathrooms) {
        if (uiBathrooms[i].checked) {
            return parseInt(i) + i;
        }
    }
    return -1;
}

function getBHKValue() {
    var uiBHK = document.getElementsByName('uiBHK');
    for (var i in uiBHK) {
        if (uiBHK[i].checked) {
            return parseInt(i) + i;
        }
    }
    return -1;
}

function onClickedEstimatePrice() {
    console.log("Estimate price button clicked!");
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var currency = document.getElementById('uiCurrency');
    var estPrice = document.getElementById("uiEstimatedPrice");

    var url = "http://127.0.0.1:5000/predict_home_price";

    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bathrooms,
        location: location.value
    }, function (data, status) {
        console.log(data.estimated_price);
        if (currency.value == 'USD') {
            estPrice.innerHTML = "<h2>$" + (data.estimated_price * 0.82).toFixed(2) + "K</h2>";
            console.log(status);
        } else {
            estPrice.innerHTML = "<h2>" + data.estimated_price + " Lakh Taka</h2>";
            console.log(status);
        }

    });

}

function onPageLoad() {
    console.log('Document loaded');
    var url = "http://127.0.0.1:5000/get_location_names";

    $.get(url, function (data, status) {
        console.log("Got response from get_location_names");
        var locations = data.location || data.locations;

        if (status === "success" && locations) {
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();

            locations.forEach(location => {
                var opt = new Option(location);
                $('#uiLocations').append(opt);
            });
        }
    });
}

window.onload = onPageLoad;
