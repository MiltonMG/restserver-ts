"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json(usuarios);
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        res.json(usuario);
    }
    else {
        res.status(404).json({
            msg: 'No existe un usuario con ese id'
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        //Validamos que el email ingresado no exista ya en la bd
        const exiteEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (exiteEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con ese email'
            });
        }
        else {
            const usuario = yield usuario_1.default.create(body);
            yield usuario.save();
            return res.status(201).json({
                ok: true,
                usuario
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error interno, hable con el administrador'
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        //Validamos que el usuario ingresado exista en la bd
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con ese id'
            });
        }
        else {
            usuario.update(body);
            return res.json({
                ok: true,
                usuario
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error interno, hable con el administrador'
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        //Validamos que el usuario ingresado exista en la bd
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con ese id'
            });
        }
        else {
            // await usuario.destroy(); -> Eliminar del todo de la bd
            yield usuario.update({ estado: false });
            return res.json({
                ok: true,
                usuario
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error interno, hable con el administrador'
        });
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuario.controller.js.map