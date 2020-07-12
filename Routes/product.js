const express = require("express")
const router = express.Router()
const { create, read, productbyid, deleteproduct, update, list, listrelated, listcategories, listbysearch, photo } = require("../Controllers/product")
const { reqsignin, isAuth, isAdmin } = require("../Controllers/Userauth")
const { userbyid } = require("../Controllers/user")


router.post('/product/create/:userid', reqsignin, isAuth, isAdmin, create)
router.put('/product/:productid/:userid', reqsignin, isAuth, isAdmin, update)
router.get('/products', list)
router.get('/products/related/:productid', listrelated)
router.get('/products/categories', listcategories)
router.get('/product/:productid', read)
router.post('/product/by/search', listbysearch)
router.get('/product/photo/:productid', photo)

router.delete('/product/:productid/:userid', reqsignin, isAuth, isAdmin, deleteproduct)


router.param('productid', productbyid)
router.param('userid', userbyid)


module.exports = router