from distutils.log import debug
from flask import Flask, render_template

app = Flask(__name__)

# Criar a primeira pagina
@app.route("/")
def homepage():
    nome = "Ez"
    return render_template("homepage.html", nome=nome)

# Coloca o site no ar
if __name__ == '__main__':
    app.run(debug=True)