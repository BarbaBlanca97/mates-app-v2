
try {
    db = connect("localhost:27017/mates-app");
    db.runCommand({ collMod: 'prestamos',
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "persona.dni",
                "persona.name",
                "persona.lastName",
                "persona.facultad",
                "pedido.mates",
                "pedido.bombillas",
                "pedido.termos",
                "pedido.yerba"
            ],
            properties: {
                "persona.dni": {
                    bsonType: "int",
                    minimum: 0
                },
                "persona.name": {
                    bsonType: "string"
                },
                "persona.lastName": {
                    bsonType: "string"
                },
                "persona.facultad": {
                    bsonType: "string"
                },
                "pedido.mates": {
                    bsonType: "int",
                    minimum: 0
                },
                "pedido.bombillas": {
                    bsonType: "int",
                    minimum: 0
                },
                "pedido.termos": {
                    bsonType: "int",
                    minimum: 0
                },
                "pedido.yerba": {
                    bsonType: "bool"
                },
                "devolucion.mates": {
                    bsonType: "int",
                    minimum: 0
                },
                "devolucion.bombillas": {
                    bsonType: "int",
                    minimum: 0
                },
                "devolucion.termos": {
                    bsonType: "int",
                    minimum: 0
                }
            }
        }
    }
});
} catch (error) { printjson(error); }