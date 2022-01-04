const fs = require('fs');
// fs.readFile('./pages/one.md', (err, data1) => {
//     fs.readFile('./pages/two.md', (err, data2) => {
//         fs.readFile('./pages/three.md', (err, data3) => {
//             if (err) throw err;
//             let result = data1 + '\r\n' + data2 + '\r\n' + data3
//             console.log(result)
//         })
//     })
// })
let p = new Promise((resolve, rejects) => {
    fs.readFile('./pages/three.md', (err, data) => {
        if (err) rejects(err);
        resolve(data)
    })
});
p.then(value => {
    return new Promise((resolve, rejects) => {
        fs.readFile('./pages/two.md', (err, data) => {
            if (err) rejects(err);
            resolve([value, data])
        })
    })
}).then(value => {
    return new Promise((resolve, rejects) => {
        fs.readFile('./pages/one.md', (err, data) => {
            if (err) rejects(err);
            value.push(data);
            resolve(value)
        })
    })
}).then(value => {
    console.log(value.join('\r\n'))
})