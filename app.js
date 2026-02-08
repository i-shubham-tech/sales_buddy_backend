var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');
var userInterfaceRouter = require('./routes/userInterface');
var servicesRouter = require('./routes/services')
var brandsRouter = require('./routes/brands')
var productsRouter = require("./routes/products")
var productColorsRouter = require("./routes/productColors")
var productVarientsRouter = require("./routes/productVarients");
var productDetailsRouter = require("./routes/productDetails")
var productPictureRouter = require("./routes/productPicture")
var advertismentRouter = require("./routes/advertisment")
var adminRouter = require("./routes/admin")
var OrderRouter = require("./routes/order")
var bannerRouter = require("./routes/banner")



var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/userinterface', userInterfaceRouter);
app.use('/services', servicesRouter);
app.use('/brands', brandsRouter);
app.use('/products', productsRouter);
app.use('/productColors', productColorsRouter);
app.use('/productVarients', productVarientsRouter);
app.use('/productdetails', productDetailsRouter);
app.use('/productpicture', productPictureRouter);
app.use('/advertisment', advertismentRouter);
app.use('/order', OrderRouter);
app.use("/banner", bannerRouter)

app.use('/admin', adminRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
