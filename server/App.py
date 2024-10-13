from flask import Flask, request, jsonify
import random

app = Flask(__name__)

symbols = ["🍒", "🍋", "🍊", "🍉", "🍇"]

@app.route("/spin", methods=["POST"])
def spin():
    data = request.get_json()
    credits = data.get("credits", 100)

    if credits <= 0:
        return jsonify({"message": "No credits left!", "reels": ["🍒", "🍒", "🍒"], "newCredits": 0})

    # Spin the reels
    reels = [random.choice(symbols) for _ in range(3)]
    
    # Simple winning logic (if all symbols match)
    if reels[0] == reels[1] == reels[2]:
        credits += 10
        message = "You won 10 credits!"
    else:
        credits -= 1
        message = "You lost 1 credit."

    return jsonify({"reels": reels, "newCredits": credits, "message": message})

if __name__ == "__main__":
    app.run(debug=True)
