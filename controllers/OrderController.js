const { Order, ProductOrder } = require("../models/index")

class OrderController {
    static newOrder(req, res, next) {
        let UserId = req.currentUserId
        let newOrder = {
            UserId
        }
        Order.create(newOrder)
            .then(result => res.status(201).json({
                msg: `created new order`,
                id: result.id,
                UserId: result.UserId
            }))
            .catch(err => console.log(err))
    }
}


/*NOTES FOR ME NEXT (jangan  di rubah, bentrok cari solusi lain)
alur order: ketika login, otomatis sudah terbuat order baru dengan userid milik user yg login, order_status default false dan amount default 0 karena user belum melakukan checkout
orderId kemudian disimpan localstorage agar mudah diakses saat penyimpanan(client)

tambahkan method pada cart yg nantinya mengisi orderid dan productid,

checkout untuk melihat orderan apa saja, panggil semua product order yg memiliki orderid saat kita login,
ketika kita selesai checkout(memesan) maka tabel order akan update order_status menjadi true dan amount jumlah tabel productorder yang memiliki orderid

*/


module.exports = OrderController