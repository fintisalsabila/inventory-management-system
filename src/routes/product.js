const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.main);
router.get('/sales/:day/:month/:year', productController.sales_of_day);
router.post('/sales/add_product/:day/:month/:year', productController.add_product_day);
router.get('/sales/delete/:day/:month/:year/:product_id', productController.delete_product_day);
router.get('/stock', productController.reports_view);
router.post('/stock/add_report', productController.add_report);
router.post('/stock/update/:report_id', productController.edit_report);
router.get('/stock/update/:report_id', productController.edit_report_view);
router.get('/stock/delete/:report_id', productController.delete_report);
router.get('/stock/:report_id', productController.stock_products);
router.post('/stock/:report_id/add_product', productController.stock_add);
router.get('/stock/:report_id/update/:stock_id', productController.stock_edit_view);
router.post('/stock/:report_id/update/:stock_id', productController.stock_edit);
router.get('/stock/:report_id/delete/:stock_id', productController.stock_delete);

module.exports = router;