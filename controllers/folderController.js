const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const Folder = require('../models/Folder');

exports.newFolder = async (req, res) => {
    let { body } = req;
    console.log('entro', body)
    try {        
        const newFolder = new Folder({ ...body });
        await newFolder.save();
        res.send(newFolder);
    } catch (error) {
        console.log(error);
        res.status(400).send('There was an error creating the folder');
    }
};
exports.editFolder = async (req, res) => {
    try {
        const { body } = req;
        console.log('body', body)
        const folder = await Folder.findByIdAndUpdate({_id: body.id}, body );        
        // await folder.save();
        res.send(folder);
    } catch (error) {
        res.status(400).send({ msg: 'There was an error editing a task' });
    }
}
exports.deleteFolder = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('entro', req.params)
        await Folder.findByIdAndDelete(id);
        res.send({ msg: 'deleted folder' });
    } catch (error) {
        res.status(400).json({ msg: 'failed to delete folder' });
        console.log('🚀 - error', error);
    }
}
exports.getFolder = async (req, res) => {
    try {
        const { id } = req.params;
        const folderFound = await Folder.findById({_id: id});
        res.send(folderFound);
    } catch (error) {
        res.status(400).send({msg: 'There was an error getting the folder'});
    }
}
exports.getFolders = async (req, res) => {
    try {
        const folders = await Folder.find();
        res.send(folders);
    } catch (error) {
        res.status(400).json({ msg: 'error getting the folders' });
        console.log('🚀 - error', error);
    }
}

exports.newToDo = async (req, res) => {
    try {
        const { body } = req;
        let folder = await Folder.findById(body.id);
        folder.toDo.push(body)
        await folder.save();        
        res.send(folder);
    } catch (error) {
        res.status(400).send({ msg: 'There was an error creating a task' });
    }
}
exports.editItem = async (req, res) => {
    try {
        const { body } = req;
        const folder = await Folder.findById(body.id);
        if (body.check === undefined) {
            folder.toDo[body.i].bodyItem = body.bodyItem;
        } else {
            folder.toDo[body.i].check = body.check;
        }
        await folder.save();
        res.send(folder);
    } catch (error) {
        res.status(400).send({ msg: 'There was an error editing a task' });
    }
}

exports.deleteItem = async (req, res) => {
    try {
        const { body } = req;
        const folder = await Folder.findById(body.id);
        const newList = [];
        const toDo = folder.toDo.length;
        
        for (let index = 0; index < toDo; index++) {
            const element = folder.toDo[index];
            if ( index === body.i ) {
            } else {
                newList.push(element);
            }
        }
        folder.toDo = newList;
        await folder.save();
        res.send(folder);
    } catch (error) {
        res.status(400).send({ msg: 'There was an error editing a task' });
    }
}