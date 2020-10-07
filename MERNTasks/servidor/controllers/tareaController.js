const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');

//Crea una nueva Tarea
exports.creaTarea = async (req,res) => {
    // Revisar si hay errores
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    //Extraer proyecot y comprobar si existe
    
    try {

        const {proyecto} = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        // Revisar si el proyecot actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        // Creamos la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }

}

//Obtiene las tareas por proyecto

exports.obtenerTareas = async (req,res) => {


        try {
            const {proyecto} = req.query;
            existeProyecto = await Proyecto.findById(proyecto);
            if(!existeProyecto){
                return res.status(404).json({msg: 'Proyecto no encontrado'})
            }

            // Revisar si el proyecot actual pertenece al usuario autenticado
            if(existeProyecto.creador.toString() !== req.usuario.id){
                return res.status(401).json({msg: 'No autorizado'})
            }

            //Obtener las tareas por proyecto
            const tareas = await Tarea.find({ proyecto });
            res.json({tareas});
        } catch (error) {
            console.log(error)
            res.status(500).send('Hubo un error');
        }
}

//Elimina un proyecto por ID
exports.actualizarTarea = async (req,res) => {
    try {
        const {proyecto, nombre, estado} = req.body;

        //Si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea){
            return res.status(404).json({msg: 'No existe esa tarea'})
        }
        // Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecot actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        
        //Crear un objeto con la nueva informacion
        const nuevaTarea = {};
            tarea.nombre = nombre;
            tarea.estado = estado;

        //Guardar la tarea
        tarea = await Tarea.findByIdAndUpdate({_id: req.params.id}, nuevaTarea, { new: true });

        res.json({tarea})

        
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }
}

// Elimina una tarea
exports.eliminarTarea = async (req, res) => {
    try {
        const {proyecto} = req.query;

        //Si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea){
            return res.status(404).json({msg: 'No existe esa tarea'})
        }
        // Extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecot actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        //Eliminar
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Tarea eliminada'});

        
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }
}