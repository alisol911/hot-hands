import os

from flask import (
    Blueprint, jsonify, request, abort, Response
)

from server.models import (Hand, HandType)

bp = Blueprint('blog', __name__)

@bp.route('/api/hand/throw', methods=['GET'])
def ApiThrow():
    h = Hand()
    return jsonify(result = h.Throw().name)

@bp.route('/api/hand/types', methods=['GET'])
def ApiGetHands():
    hands = [h.name for h in list(HandType)]
    return jsonify(result = hands[1:])

@bp.route('/api/hand/judge', methods=['POST'])
def judge():
    content = request.get_json()
    if content is not None and 'hand1' in content and 'hand2' in content:
        return jsonify(result = Hand().Judge(HandType[content['hand1']], HandType[content['hand2']]).name)
    else:
        return abort(Response('Invalid input'))