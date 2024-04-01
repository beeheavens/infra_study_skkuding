const http = require('http');
const os = require('os');
const fs = require('fs');

let server = http.createServer(function(request,response){
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.readFile('./w1.html',function(_,data){
        html = data.toString();
        html = html.replace("{{type}}", os.type());
        html = html.replace("{{hostname}}", os.hostname());
        html = html.replace("{{cpu_num}}", os.cpus().length);
        html = html.replace("{{total_mem}}", os.totalmem() + " MB");
        response.write(html);
    });
});

server.listen('3000',function(){
    console.log('server running at 3000');
});


