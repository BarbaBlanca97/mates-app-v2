/**
 * Parsea el body del request para que sea un objecto loan valido.
 * Se capea el resto de info del body
 */
const parseBody = function(req, res, next) {
    try {
        const loan = {
            _id: req.body._id,
            persona: !req.body.persona ? null : {
                dni: req.body.persona.dni,
                name: req.body.persona.name,
                lastName: req.body.persona.lastName,
                facultad: req.body.persona.facultad
            },
            pedido: !req.body.pedido ? null : {
                mates: req.body.pedido.mates,
                bombillas: req.body.pedido.bombillas,
                termos:  req.body.pedido.termos,
                yerba: req.body.pedido.yerba
            },
            devolucion: !req.body.devolucion ? null : {
                mates: req.body.devolucion.mates,
                bombillas: req.body.devolucion.bombillas,
                termos:  req.body.devolucion.termos
            }
        }

        req.body = loan;
        next();
    }
    catch (error) {
        next(error);
    }
}
module.exports.parseBody = parseBody;