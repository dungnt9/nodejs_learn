// Import các thư viện cần thiết
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const route = require('./routes');
const db = require('./config/db');

// Khởi tạo ứng dụng Express
const app = express();
const port = 3000;

// Kết nối tới cơ sở dữ liệu
db.connect();

// Thiết lập thư mục tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// Middleware để xử lý dữ liệu từ form (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Middleware để xử lý dữ liệu ở định dạng JSON
app.use(express.json());

// HTTP logger, sử dụng morgan để log các request HTTP
app.use(morgan('combined'));

// Thiết lập template engine Handlebars
app.engine('hbs', engine({
  extname: '.hbs', 
  helpers: {
    sum: (a, b) => a + b,
  },
}));

// Cấu hình view engine là Handlebars và thiết lập đường dẫn đến các views
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Sử dụng methodOverride để hỗ trợ các phương thức PUT và DELETE
app.use(methodOverride('_method'));

// Định nghĩa các tuyến đường (routes)
route(app);

// Khởi động server và lắng nghe yêu cầu trên cổng đã định nghĩa
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
