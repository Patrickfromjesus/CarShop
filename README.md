# CarShop
Projeto Carshop desenvolvido durante a formação do curso da Trybe. Aplicação do CRUD com Mongoose com Typescript. A finalidade era treinar o paradigma da Programação Orientada a Objetos e TDD.

## endpoint `/cars`
Ao utilizá-lo com o método <strong>POST</strong>, o usuário pode adicionar um carro no banco de dados, passando um body do tipo:
```json
{
  "model": "Marea",
  "year": 2002,
  "color": "Black",
  "status": true,
  "buyValue": 15.990,
  "doorsQty": 4,
  "seatsQty": 5
}
```
Listar todos os carros existentes com o método <strong>GET</strong> ou ainda listar carros específicos pelo id (com o endpoint <storng>/cars/<id></strong>)
O retorno será do tipo:
```json
        [
          {
            "id": "634852326b35b59438fbea2f",
            "model": "Marea",
            "year": 2002,
            "color": "Black",
            "status": true,
            "buyValue": 15.99,
            "doorsQty": 4,
            "seatsQty": 5
          },
          {
            "id": "634852326b35b59438fbea31",
            "model": "Tempra",
            "year": 1995,
            "color": "Black",
            "buyValue": 39,
            "doorsQty": 2,
            "seatsQty": 5
          }
        ]
```
e
```json
        {
          "id": "634852326b35b59438fbea2f",
          "model": "Marea",
          "year": 2002,
          "color": "Black",
          "status": true,
          "buyValue": 15.99,
          "doorsQty": 4,
          "seatsQty": 5
        }
```
Para deleter um carro, pode-se utilizar o método <strong>DELETE</strong>, passando o id por parâmetro. Nesse caso não há retorno, apenas o statusCode `204`.

## endpoint `/motorcycles`

<details>
  <summary><strong>Diagrama Entidade Relacionamento do projeto</strong></summary><br />

  <img src="images/diagram-der.png" height="200px" />

</details>

## 🛠️ tecnologias e frameworks utilizados
* [Node.js (Express)](http://expressjs.com/);
* [Typescript](https://www.typescriptlang.org/pt/docs/);
* [Mongoose](https://jwt.io/introduction/);
* [dotenv](https://www.dotenv.org/docs);
* [MongoDB](https://dev.mysql.com/doc/);

## ✒️ Autores
Nste projeto, tanto a aplicação, quanto os testes da mesma foram realizados por mim, [Patrick Gomes](https://www.linkedin.com/in/patrickgomesc/).

## 🎁 Honras

* Agradeço primeiramente a Deus;
* Agradeço à Instituição [Trybe](https://www.betrybe.com/) pelo estímulao diário a melhorar 🫂;
* Dediquei-me como sempre faço a este trabalho e espero que tenham gostado. A evolução é constante!
* Colossenses 3:23;
---
feito por [Patrick Gomes da Conceição](https://github.com/Patrickfromjesus);
