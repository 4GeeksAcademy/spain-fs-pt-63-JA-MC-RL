"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import User, Product, Design, Cart, db
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

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

@app.route('/user', methods=['POST'])
def create_user():
    data = request.json  # Obtiene los datos del cuerpo de la solicitud en formato JSON
    # Extrae los campos del usuario del JSON
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    phone_number = data.get('phone_number')
    city = data.get('city')
    country = data.get('country')
    postal_code = data.get('postal_code')
    address1 = data.get('address1')
    address2 = data.get('address2')

    # Crea una instancia de User con los datos proporcionados
    new_user = User(email=email, password=password, first_name=first_name, last_name=last_name,
                    phone_number=phone_number, city=city, country=country, postal_code=postal_code,
                    address1=address1, address2=address2)

    # Agrega el nuevo usuario a la base de datos
    db.session.add(new_user)
    db.session.commit()

    return jsonify(new_user.serialize()), 201  # Devuelve el nuevo usuario creado con el código de estado 201

@app.route('/users', methods=['GET'])
def get_users():
    # Consulta todos los usuarios en la base de datos
    users = User.query.all()
    
    # Serializa los usuarios en formato JSON
    users_json = [user.serialize() for user in users]
    
    # Devuelve la respuesta JSON
    return jsonify(users_json), 200


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
