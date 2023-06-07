import { Request, Response } from "express";
import Usuario from "../models/usuario";


export const getUsuarios = async ( req: Request, res: Response ) => {

    const usuarios = await Usuario.findAll();


    res.json(usuarios)

}

export const getUsuario = async( req: Request, res: Response ) => {

    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (usuario) {
        res.json(usuario)
    } else {
        res.status(404).json({
            msg:'No existe un usuario con ese id'
        })
    }



}

export const postUsuario = async( req: Request, res: Response ) => {
    
    const { body } = req;

    try {

        //Validamos que el email ingresado no exista ya en la bd

        const exiteEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        })

        if (exiteEmail) {
            return res.status(400).json({
                msg:'Ya existe un usuario con ese email'
            })
        } else {
            const usuario = await Usuario.create(body);
            await usuario.save();

            return res.status(201).json({
                ok: true,
                usuario
            })
        }
        
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error interno, hable con el administrador'
        })
        
    }


}

export const putUsuario = async ( req: Request, res: Response ) => {
    
    const { id } = req.params;
    const { body } = req;


    try {

        //Validamos que el usuario ingresado exista en la bd

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                msg:'No existe un usuario con ese id'
            })
        } else {
            usuario.update(body);

            return res.json({
                ok: true,
                usuario
            })
        }
        
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error interno, hable con el administrador'
        })
        
    }

}

export const deleteUsuario = async( req: Request, res: Response ) => {
    
    const { id } = req.params;

    try {

        //Validamos que el usuario ingresado exista en la bd

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                msg:'No existe un usuario con ese id'
            })
        } else {

            // await usuario.destroy(); -> Eliminar del todo de la bd
            await usuario.update({ estado:false });

            return res.json({
                ok: true,
                usuario
            })
        }
        
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error interno, hable con el administrador'
        })
        
    }

}

