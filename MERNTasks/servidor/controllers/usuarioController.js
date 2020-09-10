const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');

exports.crearUsuario = async (req, res) => {
    

    // extraer email y password
    const { email, password } = req.body;

    try {
        //Revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg: 'El usuario ya existe'})
        }



        //Crea el nuevo usuario
        usuario = new Usuario(req.body);

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        //Guarda el usuario
        await usuario.save();

        //Mensaje de confirmacion
        res.json({msg: 'El usuario se ha creado correctamente'})
    } catch (error) {
        console.log(error);
        res.state(400).send('Hubo un error');
    }
}