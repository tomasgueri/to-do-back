const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
// const usuarioValidation = require('../validations/usuarioValidation');
const folderController = require('../controllers/folderController');
// const authMiddleware = require('../middlewares/authMiddleware');
// const adminMiddleware = require('../middlewares/adminMiddleware');

router.post('/', folderController.newFolder);
router.put('/', folderController.editFolder);
router.delete('/:id', folderController.deleteFolder);
router.get('/', folderController.getFolders);
router.get('/one/:id', folderController.getFolder);
router.put('/item', folderController.editItem);
router.put('/new', folderController.newToDo);
router.put('/delete', folderController.deleteItem);

module.exports = router;
