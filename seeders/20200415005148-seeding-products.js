'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      productName: 'salgador',
      imageUrl: 'https://www.stuartslondon.com/images/grenson-archie-tan-calf-brogue-shoes-5067-02-110006-p7670-179913_image.jpg',
      price: 200000,
      stock: 12,
      category: "brogue",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      productName: 'krakatoa',
      imageUrl: 'https://www.stuartslondon.com/images/grenson-archie-black-brogue-shoes-506701-p7671-255014_image.jpg',
      price: 210000,
      stock: 10,
      category: "brogue",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      productName: 'digidaw',
      imageUrl: 'https://cdn.shopify.com/s/files/1/1407/1106/products/tan-leather-brogue-shoe.jpg?v=1520354153',
      price: 199000,
      stock: 12,
      category: "brogue",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      productName: 'snekiw',
      imageUrl: 'https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/59/143003/1.jpg?6475',
      price: 350000,
      stock: 12,
      category: "sneakers",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      productName: 'bebaskeun',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSWUI8nof2QGPAkNM-Q49GLQfrmjtTHpcJTUiAOWBJzd40A8JwKBjfU3285_0K4eJBsQR3Sx_rr&usqp=CAc',
      price: 3999000,
      stock: 12,
      category: "sneakers",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      productName: 'belidong',
      imageUrl: 'https://www.platypusshoes.com.au/media/catalog/product/f/w/fw01655mw_wht_01.jpg',
      price: 420000,
      stock: 12,
      category: "sneakers",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      productName: 'tangtu',
      imageUrl: 'https://www.efootwear.eu/media/catalog/product/cache/image/650x650/0/0/0000206358943_01_ki.jpg',
      price: 258000,
      stock: 12,
      category: "trekking",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      productName: 'pedo',
      imageUrl: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/3/1/4693377/4693377_09efd328-c274-4fa6-9097-dbbb37ca5c76.jpg',
      price: 259000,
      stock: 12,
      category: "trekking",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      productName: 'jangar',
      imageUrl: 'https://www.trekkinn.com/f/13691/136918201/cmp-kids-rigel-mid-trekking-shoes-wp.jpg',
      price: 259000,
      stock: 12,
      category: "trekking",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
