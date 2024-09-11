const http = require('http');

const fetch = (uri, options) => {
    return new Promise((resolve, reject) => {
        const req = http.request(uri, options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    data: data
                });
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end('{}');
    });
}
