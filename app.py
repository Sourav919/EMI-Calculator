from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate_emi', methods=['POST'])
def calculate_emi():
    data = request.get_json()
    principal = data['principal']
    rate = data['rate'] / 12 / 100  # Monthly interest rate
    tenure = data['tenure'] * 12    # Total months

    # EMI Calculation Formula
    emi = (principal * rate * (1 + rate)**tenure) / ((1 + rate)**tenure - 1)
    total_amount = emi * tenure
    total_interest = total_amount - principal

    return jsonify({
        'emi': round(emi, 2),
        'total_interest': round(total_interest, 2),
        'total_amount': round(total_amount, 2)
    })

if __name__ == '__main__':
    app.run(debug=True)
