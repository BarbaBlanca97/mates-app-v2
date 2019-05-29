const app           = require('express')();
const bodyParser    = require('body-parser');
const loansRouter   = require('./routers/loans.router');

const PORT = 3131;

app.use(bodyParser.json());
app.use('/api', loansRouter)

app.use(function(error, req, res, next) {
    console.log(error);
    res.status(400);
    res.json({ error: "Algo salió mal" });
});

app.listen(PORT,
    () => console.log(`Servidor escuchando en el puerto ${PORT}`));