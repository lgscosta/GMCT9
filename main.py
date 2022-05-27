from flask import Flask, render_template
from distutils.log import debug, info

import requests

app = Flask(__name__)

# Criar a primeira pagina
@app.route("/")
def homepage():
    nome = "Ez"
    return render_template("homepage.html", nome=nome)

# Retorna o json da API do LabGrad
@app.route("/labgrad")
def labgradpage():
    req = requests.get("https://lar.inf.ufes.br/aula/getHorarioReservas?labgrad_id=3&data_atual=2022-05-05")
    return req.json()

# Coloca o site no ar
if __name__ == '__main__':
    app.run(debug=True)