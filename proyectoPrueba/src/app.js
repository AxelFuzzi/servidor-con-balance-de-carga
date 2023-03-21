import express from 'express';
import cluster from 'cluster';
import http from 'http';
import { cpus } from 'os';

//const app = express();

const PORT = process.env.PORT ||8080;

const numCPUs = cpus().length;

if (cluster.isPrimary){

    for (let i = 0; i < numCPUs; i++){
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
    })
}else{
    http.createServer((req, res) => {
        res.writeHead(200);          
        res.end('hello word\n');
    }).listen(8000);

    console.log(`worker ${process.pid} started`);
}

//app.listen(PORT,()=>console.log(`Listening on ${PORT}`))

//pp.get('/',(req,res)=>{
//   res.send(`Petición atendida por ${process.pid} en ${PORT}`)
//)