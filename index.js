const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

// Module scaffolding
const app = {};

// Configuration section
app.config = {
    port: 3000,
};

// Create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`Listening on port ${app.config.port}`);
    });
};

// Handle Request and Response
app.handleReqRes = (req, res) => {
    // Parse the URL
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const decoder = new StringDecoder('utf-8');

    // Log request details for debugging
    const headerObject = req.headers;
    console.log('Query Parameters:', queryStringObject);
    console.log('Path:', trimmedPath);
    console.log('Headers:', headerObject);
    console.log('Method:', method);

    // Handle incoming payload
    let realData = '';

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();

        // Log payload data
        console.log('Payload:', realData);

        res.end('hello world');
    });
};

// Start the server
app.createServer();
