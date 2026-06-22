const http = require('http');

const studentData = {
    name: 'Test Student',
    cms_id: 12345,
    room_no: 1234,
    batch: 2026,
    dept: 'CS',
    course: 'BS',
    email: 'student.test@gmail.com',
    father_name: 'Father Name',
    contact: '03001234567',
    address: 'Test Address',
    dob: '2000-05-14',
    cnic: '1234567890123',
    hostel: 'Default Hostel',
    password: 'Student@2026'
};

const postData = JSON.stringify(studentData);

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/student/register-student',
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
