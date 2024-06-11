from flask import Blueprint, request, jsonify
from api.models import db, User, Product, Design, Order, OrderItem
from flask_cors import CORS
from datetime import datetime, timezone, timedelta
from flask_bcrypt import generate_password_hash, check_password_hash
import jwt


api = Blueprint('api', __name__)
CORS(api)
bcrypt = Bcrypt()
SECRET_KEY = "your_secret_key_here"

@api.before_app_request
def create_tables():
    db.create_all()

# Endpoints para User
@api.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users])

@api.route('/user/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.serialize())

@api.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(
        email=data['email'],
        password=hashed_password,
        first_name=data['first_name'],
        last_name=data['last_name'],
        phone_number=data['phone_number'],
        city=data['city'],
        country=data['country'],
        postal_code=data['postal_code'],
        registration_date=datetime.now(timezone.utc),
        address1=data['address1'],
        address2=data.get('address2')
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201

#Endpoint POST de Login

@api.route('/user/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Invalid email or password"}), 401

    # Crear un token JWT con una duración de 24 horas
    expiration_date = datetime.now(timezone.utc) + timedelta(days=1)
    jwt_token = jwt.encode({'user_id': user.id, 'exp': expiration_date}, SECRET_KEY, algorithm='HS256')

    return jsonify({"token": jwt_token.decode('utf-8')}), 200

@api.route('/user/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get_or_404(id)
    data = request.get_json()
    user.email = data.get('email', user.email)
    user.password = data.get('password', user.password)
    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.phone_number = data.get('phone_number', user.phone_number)
    user.city = data.get('city', user.city)
    user.country = data.get('country', user.country)
    user.postal_code = data.get('postal_code', user.postal_code)
    user.registration_date = data.get('registration_date', user.registration_date)
    user.address1 = data.get('address1', user.address1)
    user.address2 = data.get('address2', user.address2)
    db.session.commit()
    return jsonify(user.serialize())

@api.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted"})

# Endpoints para Product
@api.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.serialize() for product in products])

@api.route('/product/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.serialize())

@api.route('/product', methods=['POST'])
def create_product():
    data = request.get_json()
    new_product = Product(
        name=data.get('name'),
        price=data.get('price'),
        description=data.get('description'),
        image_url=data.get('image_url'),
        size=data.get('size'),
        color=data.get('color'),
        stock=data.get('stock')
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify(new_product.serialize()), 201

@api.route('/product/<int:id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get_or_404(id)
    data = request.get_json()
    product.name = data.get('name', product.name)
    product.price = data.get('price', product.price)
    product.description = data.get('description', product.description)
    product.image_url = data.get('image_url', product.image_url)
    product.size = data.get('size', product.size)
    product.color = data.get('color', product.color)
    product.stock = data.get('stock', product.stock)
    db.session.commit()
    return jsonify(product.serialize())

@api.route('/product/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted"})

# Endpoints para Order
@api.route('/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    serialized_orders = [order.serialize() for order in orders]
    for order in serialized_orders:
        order['status'] = order['status'].value
    return jsonify(serialized_orders), 200

@api.route('/orders/<int:id>', methods=['GET'])
def get_order_by_id(id):
    order = Order.query.get(id)
    if order:
        order_data = order.serialize()
        order_data['status'] = order_data['status'].value
        return jsonify(order_data), 200
    return jsonify({'message': 'Pedido no encontrado'}), 404

@api.route('/order', methods=['POST'])
def create_order():
    data = request.json
    try:
        user_id = int(data['user_id'])
    except ValueError:
        return jsonify({'error': 'El valor de user_id no es un entero válido'}), 400

    new_order = Order(
        user_id=user_id,
        total_amount=data['total_amount'],
        order_date=data.get('order_date'),
        status=data['status']
    )
    db.session.add(new_order)
    db.session.commit()
    return jsonify({'message': 'Pedido creado exitosamente'}), 201

# Endpoints para OrderItem
@api.route('/order-items', methods=['GET'])
def get_order_items():
    order_items = OrderItem.query.all()
    return jsonify([item.serialize() for item in order_items])

@api.route('/order-item/<int:id>', methods=['GET'])
def get_order_item(id):
    order_item = OrderItem.query.get_or_404(id)
    return jsonify(order_item.serialize())

@api.route('/order-item', methods=['POST'])
def create_order_item():
    data = request.get_json()
    new_order_item = OrderItem(
        user_id=data.get('user_id'),
        order_id=data.get('order_id'),
        product_id=data.get('product_id'),
        design_id=data.get('design_id'),
        quantity=data.get('quantity'),
        price=data.get('price')
    )
    db.session.add(new_order_item)
    db.session.commit()
    return jsonify(new_order_item.serialize()), 201

# Endpoints para Design
@api.route('/designs', methods=['GET'])
def get_designs():
    designs = Design.query.all()
    return jsonify([design.serialize() for design in designs])

@api.route('/design/<int:id>', methods=['GET'])
def get_design(id):
    design = Design.query.get_or_404(id)
    return jsonify(design.serialize())

@api.route('/design', methods=['POST'])
def create_design():
    data = request.json
    name = data.get('name')
    url = data.get('url')

    if not all([name, url]):
        return jsonify({"error": "Missing required fields"}), 400

    new_design = Design(
        name=name,
        url=url
    )
    db.session.add(new_design)
    db.session.commit()

    return jsonify({"message": "Design created successfully", "design": new_design.serialize()})