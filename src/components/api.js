
let year= "2021";
let country = "US";
const API_Key = "5833643d-51d4-4c6a-9bc2-22571be467e6";
const url = `https://holidayapi.com/v1/holidays?pretty&key=${API_Key}&country=${country}&year=${year}`;

    export const fetchHolidays = async () => {
        try {
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                console.log(data.holidays);
                return data.holidays;
            }
            
        } catch (error) {
            console.log(`nice you got an error!, wait.. uh oh... ${error}`)
        }
    }
    fetchHolidays()
