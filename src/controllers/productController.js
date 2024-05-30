const controller = {};

//Main view
controller.main = (req, res) =>{
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM stock', (err, stock) => {
            conn.query('SELECT * FROM reports', (err, report) => {
                if (err){
                    res.json(err);
                }
                res.render('main', {
                    stock_data: stock,
                    report_data: report
                });
            });
        });
    });
}

//View of sales of days linked to calendar
controller.sales_of_day = (req, res) => {
    const { day } = req.params;
    const { month } = req.params;
    const { year } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM products WHERE product_day = ? AND product_month = ? AND product_year = ?', [day, month, year], (err, products) => {
            res.render('sales_of_day', {
                info_day: req.params,
                product_data: products
            });
        });
    });
}

//Add product to the indicate day
controller.add_product_day = (req, res) => {
    const { day } = req.params;
    const { month } = req.params;
    const { year } = req.params;
    var product_body = req.body;
    var product = {
        product_product: product_body.product_product,
        product_value: product_body.product_value,
        product_quantity: product_body.product_quantity,
        product_day: day,
        product_month: month,
        product_year: year
    }
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO products SET ?', [product], (err, products) => {
            console.log('Añadido con exito');
        }),
            conn.query('SELECT * FROM stock WHERE stock_product = ?', [product.product_product], (err, products) => {
                var result = (Number(products[0].stock_quantity) - Number(product.product_quantity));
                conn.query('UPDATE stock SET stock_quantity = ? WHERE stock_product = ?', [result, product.product_product], (err, stock) => {
                    console.log('Se ha actualizado con exito');
                    res.redirect('/sales/' + day + '/' + month + '/' + year);
                });
            });
    });
}

//Delete product of a product day
controller.delete_product_day = (req, res) => {
    const { product_id } = req.params;
    const { day } = req.params;
    const { month } = req.params;
    const { year } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM products WHERE product_day = ? AND product_month = ? AND product_year = ? AND product_id = ?', [day, month, year, product_id], (err, rows) => {
            console.log('Eliminado con exito!');
            res.redirect('/sales/' + day + '/' + month + '/' + year);
        });
    });
}

//Show all reports of stock
controller.reports_view = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM reports', (err, reports) => {
            if (err) {
                res.json(err);
            }
            res.render('stock', {
                report_data: reports
            });
        });
    });
}

//Add new report to stock area
controller.add_report = (req, res) => {
    report_info = req.body;
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO reports SET ?', [report_info], (err, products) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/stock');
        });
    });
}

//Update the report stock
controller.edit_report = (req, res) => {
    const { report_id } = req.params;
    const new_stock = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE reports SET ? WHERE report_id = ?', [new_stock, report_id], (err, rows) => {
            res.redirect('/stock');
        });
    });
}

//Show edit report stock view
controller.edit_report_view = (req, res) => {
    const { report_id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM reports WHERE report_id = ?', [report_id], (err, reports) => {
            res.render('report_edit', {
                report_data: reports[0]
            });
        });
    });
}

//Delete report 
controller.delete_report = (req, res) => {
    const { report_id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM reports WHERE report_id = ?', [report_id], (err, rows) => {
            res.redirect('/stock');
        });
    });
}

//Show products of stock 
controller.stock_products = (req, res) => {
    const { report_id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM stock WHERE report_id = ?', [report_id], (err, stocks) => {
            res.render('stock_products', {
                stock_data: stocks,
                report_id: report_id
            });
        });
    });
}

//Add stock in stock table
controller.stock_add = (req, res) => {
    const { report_id } = req.params;
    const stock_body = req.body;
    var new_stock = {
        stock_product: stock_body.stock_product,
        stock_value: stock_body.stock_value,
        stock_quantity: stock_body.stock_quantity,
        report_id: report_id
    }
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO stock SET ?', [new_stock], (err, stocks) => {
            res.redirect('/stock/' + report_id);
        });
    });
}

//Stock edit view to stock table
controller.stock_edit_view = (req, res) => {
    const { report_id } = req.params;
    const { stock_id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM stock WHERE report_id = ? AND stock_id = ?', [report_id, stock_id], (err, stock) => {
            res.render('stock_edit', {
                stock_data: stock[0]
            });
        });
    });
}

//Update the stock product
controller.stock_edit = (req, res) => {
    const { report_id } = req.params;
    const { stock_id } = req.params;
    var edit_stock = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE stock SET ? WHERE report_id = ? AND stock_id = ?', [edit_stock, report_id, stock_id], (err, rows) => {
            res.redirect('/stock/' + report_id);
        });
    });
}

//Delete a product of stock table
controller.stock_delete = (req, res) => {
    const { report_id } = req.params;
    const { stock_id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM stock WHERE report_id = ? AND stock_id = ?', [report_id, stock_id], (err, rows) => {
            res.redirect('/stock/' + report_id);
        });
    });
}

module.exports = controller;