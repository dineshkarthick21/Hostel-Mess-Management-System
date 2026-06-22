const http = require('http');

const hostelData = {
    name: 'Attar Hostel 1',
    location: 'https://goo.gl/maps/Az89wA3NsPaXfMfP9',
    rooms: 350,
    capacity: 700,
    vacant: 350
};

const postData = JSON.stringify(hostelData);

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/admin/create-hostel', // Adjust based on actual endpoint
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        console.log('Response:', data);
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(postData);
req.end();
