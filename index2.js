const express = require('express');
const threads = require('os').availableParallelism();
const cluster = require('cluster');
const app = express();


if (cluster.isPrimary) {
    console.log(`Primary cluster ${process.pid} is running `);

    let i;
    for (i = 0; i < threads; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
      });
} else {

    app.get('/', (req, res) => {
        return res.json({ msg: `Hello from express server ${process.pid}` });
    });

    app.listen(8080, () => {
        console.log('Server Started');
    });

}

