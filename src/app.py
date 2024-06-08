"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from datetime import timezone, datetime
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import User, Product, Design, Cart, db, Order, OrderItem
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

# from models import Person
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')


# Creación de la base de datos
@app.before_first_request
def create_tables():
    db.create_all()

# Endpoints para User

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users])

@app.route('/user/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.serialize())

@app.route('/user', methods=['POST'])
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

@app.route('/user/<int:id>', methods=['PUT'])
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

@app.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted"})

# Endpoints para Product

@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.serialize() for product in products])

@app.route('/product/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.serialize())

@app.route('/product', methods=['POST'])
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

@app.route('/product/<int:id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get_or_404(id)
    data = request.get_json()
    product.name = data.get('name', product.name)
    product.price = data.get('price', product.price)
    product.description = data.get('description', product.description)
    product.image_url = data.get('image_url', product.image_url)
    product.size = data.get('size', product.size.name)
    product.color = data.get('color', product.color.name)
    product.stock = data.get('stock', product.stock)
    db.session.commit()
    return jsonify(product.serialize())

@app.route('/product/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted"})

# Endpoints para Order

@app.route('/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    serialized_orders = [order.serialize() for order in orders]
    for order in serialized_orders:
        order['status'] = order['status'].value
    return jsonify(serialized_orders), 200

@app.route('/orders/<int:id>', methods=['GET'])
def get_order_by_id(id):
    order = Order.query.get(id)
    if order:
        order_data = order.serialize()
        order_data['status'] = order_data['status'].value
        return jsonify(order_data), 200
    return jsonify({'message': 'Pedido no encontrado'}), 404

@app.route('/order', methods=['POST'])
def create_order():
    data = request.json
    try:
        user_id = int(data['user_id'])  # Asegúrate de que user_id sea un entero válido
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

@app.route('/order-items', methods=['GET'])
def get_order_items():
    order_items = OrderItem.query.all()
    return jsonify([item.serialize() for item in order_items])

@app.route('/order-item/<int:id>', methods=['GET'])
def get_order_item(id):
    order_item = OrderItem.query.get_or_404(id)
    return jsonify(order_item.serialize())

@app.route('/order-item', methods=['POST'])
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

@app.route('/designs', methods=['GET'])
def get_designs():
    designs = Design.query.all()
    return jsonify([design.serialize() for design in designs])

@app.route('/design/<int:id>', methods=['GET'])
def get_design(id):
    design = Design.query.get_or_404(id)
    return jsonify(design.serialize())

@app.route('/design', methods=['POST'])
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

    return jsonify({"message": "Design created successfully", "design": new_design.serialize()}), 201

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
