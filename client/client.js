const http = require('https');
const fs = require('fs');
const _pick = require('lodash.pick');
http.get('https://api.kucoin.com/api/v1/market/allsymbols', res => {
    let body = '';

    res.on('data', data => {

        body += data;
    })

    res.on('end', () => fs.writeFile('./kucoin.json', body, (err) => {
        if (err) throw err;
        console.log('file created successfully');
    }));
    var data = fs.readFileSync("kucoin.json");

    const myObject = JSON.parse(data);
    const newData2 = JSON.stringify(myObject);
    fs.writeFile("data2.json", newData2, (err) => {
        // Error checking
        if (err) throw err;
        console.log("New data added");
    });
})
