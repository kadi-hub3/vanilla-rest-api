const Product = require('../models/product.model')

const { getPostData } = require('../utils')

//Get all product
const getProducts = async (req, res) => {

    try {
        const products = await Product.find()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error);
    }
}

//Get single products
const getProduct = async (req, res, id) => {

    try {
        const product = await Product.findById(id)
        if (!product) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'product nt found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(product))
        }

    } catch (error) {
        console.log(error);
    }
}

//Create product
const create = async (req, res) => {

    try {
        const body = await getPostData(req)
        const { title, description, price } = JSON.parse(body)
        const product = {
            title,
            description,
            price
        }
        const newProduct = await Product.create(product)
        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newProduct))

    } catch (error) {
        console.log(error);
    }
}

//Update product
const updateProduct = async (req, res, id) => {

    try {
        const product = await Product.findById(id)

        if (!product) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'product nt found' }))
        } else {
            const body = await getPostData(req)
            const { title, description, price } = JSON.parse(body)
            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }
            const updProduct = await Product.update(id, productData)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updProduct))
        }

    } catch (error) {
        console.log(error);
    }
}

//Remove Product
const removeProduct = async (req, res, id) => {

    try {
        const product = await Product.findById(id)
        if (!product) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'product nt found' }))
        } else {
            await Product.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Removed' }))
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
    getProduct,
    create,
    updateProduct,
    removeProduct
}