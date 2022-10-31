const dltButton = document.querySelectorAll('#dltbutton');

const tempText = document.querySelector('.temp');
const tempDesc = document.querySelector('.weather-status');



dltButton.forEach(button => {
    button.addEventListener('click', (e) => {
        if (!confirm('Are you sure? Click ok to delete.')) {
            e.preventDefault();
            window.location.assign('/employee_list')
        }
    });
});

$("#update-employee").submit(function (event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value']
    })


    var request = {
        "url": `http://localhost:3000/update_employee/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function (response) {
        alert("Data Updated Successfully!");
        window.location.assign('/employee_list');
    });


})





// for open wheteher api 


function successCallBack(pos) {
    let lat = pos.coords.latitude;
    let lon = pos.coords.longitude;

    getWeather(data => {
        tempText.innerHTML = `<span>${Math.floor(data.main.temp - 273.15)} °C<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="40px"></span><br><p class="weather-status">${data.weather[0].description}</p>`;
        console.log(data);
    }, lat, lon);
}

function errorCallBack(err) {
    console.log(err);
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack);
} else {
    console.error('geolocation is not supported')
}


function getWeather(callback, lat, lon) {
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fed8ce7207e2ef0e667e186595f8bcb4`;
    $.ajax({
        dataType: "jsonp",
        url: url,
        jsonCallback: 'jsonp',
        cache: false,
        success: function (data) {
            callback(data);
        }
    });
}



