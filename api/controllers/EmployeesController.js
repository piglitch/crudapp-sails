/**
 * EmployeesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

  list:function(req, res){
    Employees.find({}).exec((err, employees) => {
      if (err) {
        res.send(500, {error: 'Database error'});
      }
      res.view('pages/list', {employees:employees});
    });
  },
  add:function(req, res){
    res.view('pages/add')
  },
  create:function(req, res){
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var role = req.body.role;

    Employees.create({firstName:firstName, lastName:lastName, email:email, role:role}).exec((err) => {
      if (err) {
        res.send(500, { error: 'Database error' });
      }
      res.redirect('/employees/list');
    })
  },
  delete: function (req, res) {
    Employees.destroy({id:req.params.id}).exec((err) => {
      if (err) {
        res.send(500, { error: 'Database error' });
      }
      res.redirect('/employees/list');
    });
    return false;
  },
  edit: function (req, res) {
    Employees.findOne({id:req.params.id}).exec((err, employee) => {
      if (err) {
        res.send(500, { error: 'Database error' });
      }
      res.view('pages/edit', {employee:employee});
    });
  },
  update: function (req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var role = req.body.role;

    Employees.update({id:req.params.id},{firstName:firstName, lastName:lastName, email:email, role:role}).exec((err) => {
      if (err) {
        res.send(500, { error: 'Database error' });
      }
      res.redirect('/employees/list');
    });
    return false;
  }
};

