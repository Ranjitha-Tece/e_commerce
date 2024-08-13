const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

exports.createCart = async (req, res) => {
    const { user_id } = req.user;
    const { product_id, quantity } = req.body;
    let cart = await Cart.findOne({ user_id });
    if (!cart) {
        cart = new Cart({
            User_id: user_id,
            products: [{
                product_id,
                quantity
            },]
        })

    }
    else {
        const productIndex = cart.products.findIndex((p) => p.product_id === product_id)
        if (productIndex === -1) {
            cart.products.push({ product_id, quantity })

        }
        else {
            cart.products[productIndex].quantity = quantity;
        }
    }
    await cart.save();
    res.status(200).json({ message: "product added successfully" });
}

exports.getCart = async (req, res) => {
    const { user_id } = req.user;

    const cart = await Cart.findOne({ User_id: user_id });
    if (!cart) {
        res.status(404).json({ message: "Cart is Empty" })
    }
    try {
        let subTotal = 0;
        const cartItem = await Promise.all(
            cart.products.map(async (product) => {
                const productDetails = await Product.findOne({ id: product.product_id });
                subTotal += productDetails.price * product.quantity;
                return {
                    product_id: productDetails.id,
                    title: productDetails.title,
                    description: productDetails.description,
                    price: productDetails.price,
                    image: productDetails.image,
                    quantity: product.quantity
                }
            })
        )
        res.status(200).json({ cartItems: cartItem, subTotal })
    } catch (err) {
        res.status(200).json({ message: "server error", err })

    }
}; exports.deleteCart = async (req, res) => {
    const { user_id } = req.user;
    const product_id = req.params.product_id;
    const cart = await Cart.findOne({ User_id: user_id });
    try {

        if (!cart) {
            return res.status(404).json({ error: "cart not found for the user" });
        }

        const productindex = cart.products.find((product) => product_id === product.product_id);
        if (!productindex) {
            return res.status(400).json("product is not in the cart")
        }

        if (cart.products.length <= 1) {
            await Cart.deleteOne({ User_id: user_id });
            return res.status(201).json("cart deleted successfully");
        }

        else {
            cart.products = cart.products.filter(product => product.product_id != product_id);
            await cart.save();
            return res.status(200).json("Product deleted successfully");
        }
    }

    catch (err) {
        console.log(err);
    }
}