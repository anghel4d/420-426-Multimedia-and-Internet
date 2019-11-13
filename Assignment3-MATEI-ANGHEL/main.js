const url = "https://api.spacexdata.com/v3/"    // The root of SpaceX API

fetch(url)
    .then(response => response.json())
    .then(data => {
        doStuff(data)
    })
    .catch(function(error){
        console.log(error);
    });

function doStuff(data){
    console.log(data);
}