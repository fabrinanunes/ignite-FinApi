const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const customers = [];

router.post('/account', (req, res) => {
    const { cpf, name } = req.body;
  
    const cpfExists = customers.some((customer) => customer.cpf === cpf);
    if (cpfExists) return res.status(400).json({ error: 'Use a different CPF' });

    const customer = {
        cpf,
        name,
        id: uuidv4(),
        balance: []
    };
    customers.push(customer);
  
    return res.status(201).json(customer);
});

router.get('/balance/:cpf', (req, res) => {
    const { cpf } = req.params;
    const customer = customers.find(customer => customer.cpf === cpf);

    if(!customer) return res.status(400).json({ error: 'Customer not found'})

    return res.json(customer.balance);
})

module.exports = router