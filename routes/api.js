var express = require('express');
var router = express.Router();

const Distributors = require('../models/distributors')
const Fruits = require('../models/fruits');

module.exports = router;

router.post('/add-distributor',async(req,res) => {
    try {
        const data = req.body;
        const newDistributors = new Distributors({
            name: data.name,
        });
        const result = await newDistributors.save();
        if (result) {
            res.json({
                'status': 200,
                'messenger': 'Thêm thành công!',
                'data': result
            })
        } else {
            res.json({
                'status': 400,
                'messenger': 'Lỗi, thêm không thành công!',
                'data': []
            })
        }
    } catch (error) {
        console.log(error)
    }
})
router.post('/add-fruit',async(req,res) => {
    try {
        const data = req.body;
        const newDistributors = new Fruits({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            quantity: data.quantity,
            image: data.image,
            description: data.description,
            id_distributor: data.id_distributor,
        });
        const result = await newDistributors.save();
        if (result) {
            res.json({
                'status': 200,
                'messenger': 'Thêm thành công!',
                'data': result,
            })
        } else {
            res.json({
                'status': 400,
                'messenger': 'Lỗi, thêm không thành công!',
                'data': [],
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.get('/get-list-fruit',async(req,res)=>{
    try{
        const data = await Fruits.find().populate('id_distributor')
        res.json({
            'status':200,
            'messenger': 'Danh sách fruit',
            'data': data
        })
    } catch(err){
        console.log(err)
    }
})
router.get('/get-list-distributor',async(req,res)=> {
    try {
        const data = await Distributors.find();
        res.json({
            "status": 200,
            "messenger": "Danh sách distributor",
            "data": data,
        })
        console.log(data)
    } catch (err) {
        console.log(err);
    }
})

router.get('/get-list-fruit',async(req,res)=> {
    try {
        const data = await Fruits.find().populate('id_distributor');
        res.json({
            "status": 200,
            "messenger": "Danh sách fruit",
            "data": data
        })
    } catch (err){
        console.log(err);

    }
})

router.put('/update-fruit-by-id/:id',async(req,res)=> {
    try {
        const {id} = req.params;
        const data = req.params;
        const updatefruit = await Fruits.findById(id);
        console.log(updatefruit)
        let result = null;
        if (updatefruit) {
            updatefruit.name = data.name ?? updatefruit.name;
            updatefruit.quantity = data.quantity ?? updatefruit.quantity,
            updatefruit.price = data.price ?? updatefruit.price,
            updatefruit.status = data.status ?? updatefruit.status,
            updatefruit.image = data.image ?? updatefruit.image,
            updatefruit.description = data.description ?? updatefruit.description,
            updatefruit.id_distributor = data.id_distributor ?? updatefruit.id_distributor
            result = await updatefruit.save();
        }

        if (result) {
            res.json({
                "status": 200,
                "messenger": "Cập nhật thành công!",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "messenger": "Lỗi ,Cập nhật không thành công!",
                "data": []
            })
        }
    } catch (err) {
        console.log(err);
    }
})