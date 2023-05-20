const { json } = require('body-parser');   //? 
const db = require('./db'); //импорт бд

const getUsers = () => {
    return new Promise(function(resolve, reject) {
      db.query('SELECT * FROM users', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }




class DBController {
    
    /*async createUser(req, res){       //создает нового пользователя
        const {name, age} = req.body;
        console.log(name,age);
        const newPerson = await db.query('INSERT INTO  tablet (name, age) values ($1, $2) RETURNING *', [name, age]);
       res.json(newPerson.rows[0]);
    }*/ 

   /* async getUser(req, res){          //достать все данные из таблицы
        const zapros = await db.query('SELECT * FROM users');
        res.json(zapros.rows);
    }

    async getOneUser(req, res){         //достать ону запись с конкретным айди
        const id = req.params.id;
        const zapros = await db.query('SELECT * FROM users where id = $1', [id]);
        res.json(zapros.rows[0]);
    }

    async getUsername(req, res){
        const id = req.params.id;
       // const name = req.params.name;
        const zapros = await db.query('SELECT ')
    } */
    
    /*async updateUser(req, res){
        const {id, name, age} = req.body;
        const zapros = await db.query('UPDATE users set name = $1, age = $2 where id = $3 RETURNING *', [name, age, id]);
        res.json(zapros);
    }

    async deleteUser(req,res){
        const id = req.params.id;
        const zapros = await db.query('DELETE FROM tablet where id = $1', [id]);
        res.json(zapros.rows[0]);
    }*/
}

module.exports = {
                          //экспорт объекта юзер контроллера
    getUsers
}