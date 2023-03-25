window.addEventListener('load',()=>{
    let long;
    let lat;
    let temp_description = document.querySelector(".temp-description");
    let temp_degree = document.querySelector(".temp-degree");
    let location_timezone = document.querySelector(".location-timezone");
    let temperature_section = document.querySelector(".degree-section");
    const temperature_span = document.querySelector(".degree-section span");

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            fetch(api)
            .then(data_response =>{
                return data_response.json();
            })
            .then(data =>{
                console.log(data);
                const {temperature, summary,icon}= data.currently;
                //SET DOM ELEMENTS FROM API
                temp_degree.textContent = temperature;
                temp_description.textContent = summary;
                location_timezone.textContent = data.timezone;
                //SET ICONs
                setIcons(icon,document.querySelector(".icon"));
                
                //Formula for Convertion Celcius
                let celicus = (temperature -32) * (5/9);
                //Change temperture
                temperature_section.addEventListener('click',()=>{
                    if(temperature_span.textContent==="F"){
                        temperature_span.textContent="C";
                        temp_degree.textContent = Math.floor(celicus);
                    }
                    else
                    {
                        temperature_span.textContent = "F";
                        temp_degree.textContent = temperature;
                    }
                });
            });
        });
    }

    // SET ICONS
    function setIcons(icon,iconId){
        const skycons = new Skycons({color: "white"});
        const currentIcons = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId,Skycons[currentIcons]);
    }
});