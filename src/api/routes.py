from flask import Blueprint, request, jsonify, Flask
from api.models import db, User, Product, Design, Order, OrderItem
from flask_cors import CORS
from datetime import datetime, timezone
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import os

api = Blueprint('api', __name__)

api = Blueprint('api', __name__)
# Allow CORS requests to this API
CORS(api, resources={r"/*": {"origins": ["https://musical-space-goggles-r4grvv9q5wrjhp9gr-3000.app.github.dev", "https://musical-space-goggles-r4grvv9q5wrjhp9gr-3001.app.github.dev"]}})
@api.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE'
    return response

# Allow CORS requests to this API
CORS(api)

@api.before_app_request
def create_tables():
    db.create_all()

# Enpoint Login
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    user_data = user.serialize()
    token = create_access_token(identity=user.id)
    return jsonify({'token': token, 'user': user_data}), 200

# Endpoints para User
@api.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    id_user = get_jwt_identity()
    user = User.query.get(id_user)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({'user': user.serialize()})

@api.route('/user/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.serialize())

@api.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(
        email=data['email'],
        password=data['password'],
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

@api.route('/user/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get_or_404(id)
    data = request.get_json()
    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.phone_number = data.get('phone_number', user.phone_number)
    user.city = data.get('city', user.city)
    user.country = data.get('country', user.country)
    user.postal_code = data.get('postal_code', user.postal_code)
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
    return jsonify({'message': 'Order not found'}), 404

@api.route('/order', methods=['POST'])
def create_order():
    data = request.json
    try:
        user_id = int(data['user_id'])
    except ValueError:
        return jsonify({'error': 'Invalid user_id'}), 400

    new_order = Order(
        user_id=user_id,
        total_amount=data['total_amount'],
        order_date=data.get('order_date', datetime.now(timezone.utc)),
        status=data['status']
    )
    db.session.add(new_order)
    db.session.commit()
    return jsonify({'message': 'Order created successfully'}), 201

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
