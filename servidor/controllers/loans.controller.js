const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });
const dbName = 'mates-app';
const loansCollection = 'prestamos';

const createLoan = function (req, res, next) {
    client.connect(function (error) {
        if (error) {
            client.close();
            return next(error);
        }

        const db = client.db(dbName);

        db.collection(loansCollection).insertOne(
            /*
            Se inserta directamente el body de la request,
            añadir validacion en un futuro, esto así no puede quedar */
            req.body,
            function (error, result) {
                if (error) {
                    /*
                    Error, cerrando la coneccion y pasando el error al handler */
                    client.close();
                    return next(error);
                }

                /*
                Todo ok, en un futuro responder con el prestamo insertado (o que no se inserto) */
                res.status(result.insertedCount > 0 ? 200 : 400);
                res.json(result.insertedCount > 0 ? result.ops[0] : null);

                client.close();
            }
        );
    });
}
module.exports.createLoan = createLoan;

const getLoans = function (req, res, next) {
    
    let
        resultOffset = parseInt(req.query.offset),
        resultLimit = parseInt(req.query.limit);

    if (!(resultOffset && resultLimit))
    { 
        resultOffset = 0; 
        resultLimit = 10; 
    }

    client.connect(function (error) {
        if (error) {
            client.close();
            return next(error);
        }

        const db = client.db(dbName);

        db.collection(loansCollection)
            .find()
            .skip(resultOffset)
            .limit(resultLimit)
            .toArray(function (error, docs) {
                if (error) {
                    /*
                    Error, cerrando la coneccion y pasando el error al handler */
                    client.close();
                    return next(error);
                }

                res.status(200);
                res.json(docs);
            });
    });
}
module.exports.getLoans = getLoans;

const reciveLoan = function (req, res, next) {
    client.connect(function (error) {
        if (error) {
            client.close();
            return next(error);
        }

        const db = client.db(dbName);

        db.collection(loansCollection).findOneAndUpdate(
            { _id: new ObjectId(req.body._id), devolucion: null }, /*   Buscar con esto */
            { $set: { devolucion: req.body.devolucion } }, /*            Setear esto */
            { returnOriginal: false }, /*                               Config options */
            function (error, result) {
                if (error) {
                    /*
                    Error, cerrando la conexion y pasando el error al handler */
                    client.close();
                    return next(error);
                }

                res.status(result.ok == 1 ? 200 : 400);
                res.json(result.value);

                client.close();
            }
        );
    });
}
module.exports.reciveLoan = reciveLoan;