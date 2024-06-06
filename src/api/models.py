from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from flask_migrate import Migrate
from datetime import datetime, timezone
from enum import Enum

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

class SizeEnum(Enum):
    SMALL = "small"
    MEDIUM = "medium"
    LARGE = "large"
    XLARGE = "xlarge"

class ColorEnum(Enum):
    RED = "red"
    BLUE = "blue"
    GREEN = "green"
    GRAY = "gray"
    WHITE = "white"

class StatusEnum(Enum):
    PENDING = 'pending'
    COMPLETED = 'completed'

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    phone_number = db.Column(db.String(20), unique=True, nullable=False)
    city = db.Column(db.String(40), nullable=False)
    country = db.Column(db.String(40), nullable=False)
    postal_code = db.Column(db.String(20), nullable=False)
    registration_date = db.Column(db.DateTime, nullable=True)
    address1 = db.Column(db.String(100), nullable=False)
    address2 = db.Column(db.String(100), nullable=True)

    orders = db.relationship('Order', backref='user', lazy=True)
    cart_items = db.relationship('Cart', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "phone_number": self.phone_number,
            "city": self.city,
            "country": self.country,
            "postal_code": self.postal_code,
            "registration_date": self.registration_date,
            "address1": self.address1,
            "address2": self.address2
        }

class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    description = db.Column(db.String(50), nullable=True)
    image_url = db.Column(db.String(100), nullable=False)
    size = db.Column(db.Enum(SizeEnum), nullable=False)
    color = db.Column(db.Enum(ColorEnum), nullable=False)
    stock = db.Column(db.Integer, nullable=False)

    order_items = db.relationship('OrderItem', backref='product', lazy=True)
    cart_items = db.relationship('Cart', backref='product', lazy=True)

    def __repr__(self):
        return f'<Product {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "description": self.description,
            "image_url": self.image_url,
            "size": self.size,  
            "color": self.color, 
            "stock": self.stock
        }

class ProductDetail(db.Model):
    __tablename__ = 'product_detail'
    id = db.Column(db.Integer, primary_key=True)
    size = db.Column(db.String(20), nullable=False)
    color = db.Column(db.String(20), nullable=False) 
    stock = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<ProductDetail {self.id}, Size: {self.size}, Color: {self.color}, Stock: {self.stock}>'

    def serialize(self):
        return {
            "id": self.id,
            "size": self.size,  
            "color": self.color,  
            "stock": self.stock
        }

class ProductImage(db.Model):
    __tablename__ = 'product_image'
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    image_url = db.Column(db.String(100), unique=True, nullable=False)

    def __repr__(self):
        return f'<ProductImage {self.id}, Product ID: {self.product_id}, URL: {self.image_url}>'

    def serialize(self):
        return {
            "id": self.id,
            "product_id": self.product_id,
            "image_url": self.image_url
        }

class Design(db.Model):
    __tablename__ = 'designs'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=True)
    url = db.Column(db.String(100), nullable=False)

    order_items = db.relationship('OrderItem', backref='design', lazy=True)
    cart_items = db.relationship('Cart', backref='design', lazy=True)

    def __repr__(self):
        return f'<Design {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "url": self.url
        }

class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    order_date = db.Column(db.DateTime, nullable=True, default=datetime.now(timezone.utc))
    status = db.Column(db.Enum(StatusEnum), nullable=False)

    order_items = db.relationship('OrderItem', backref='order', lazy=True)

    def __repr__(self):
        return f'<Order {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "total_amount": self.total_amount,
            "order_date": self.order_date,
            "status": self.status
        }

class OrderItem(db.Model):
    __tablename__ = 'order_items'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    design_id = db.Column(db.Integer, db.ForeignKey('designs.id'), nullable=True)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)

    def __repr__(self):
        return f'<OrderItem {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "order_id": self.order_id,
            "product_id": self.product_id,
            "design_id": self.design_id,
            "quantity": self.quantity,
            "price": self.price
        }

class Cart(db.Model):  # Cart es para artículos en el carrito antes de la compra y OrderItem es para artículos ya comprados y asociados con un pedido
    __tablename__ = 'cart'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    design_id = db.Column(db.Integer, db.ForeignKey('designs.id'), nullable=True)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)

    def __repr__(self):
        return f'<Cart {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "design_id": self.design_id,
            "quantity": self.quantity,
            "price": self.price
        }