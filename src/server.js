const express = require('express');

const path = require('path');

const app = express();

app.use(express.static(process.cwd() + '/dist/dashboard-angular-products'));

app.get('/*', function(req,res) {
    res.sendFile(path.join(process.cwd()+'/dist/dashboard-angular-products/index.html'));
});

app.listen(process.env.PORT || 8080);