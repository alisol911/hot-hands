import os

from flask import (
    Blueprint, jsonify
)

from server.models import *

bp = Blueprint('blog', __name__)

@bp.route('/api/throw')
def ApiThrow():
    h = Hand()
    return jsonify(result = h.Throw().name)
