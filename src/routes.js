const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const customers = [];

function accountExists(req, res, next){
    const { cpf } = req.headers;
    const customer = customers.find(customer => customer.cpf === cpf);

    if (!customer) {
        return res.status(400).json({ error: "Customer not found" });
    };

    req.customer = customer;

    return next();
};

function getBalance(transactions){
    const balance = transactions.reduce((acc, operation) => {
        if(operation.type === 'credit'){
            return acc + operation.amount;
        }else{
            return acc - operation.amount;
        }
    }, 0);

    return balance;
}

router.post('/account', (req, res) => {
    const { cpf, name } = req.body;
  
    const cpfExists = customers.some((customer) => customer.cpf === cpf);
    if (cpfExists) return res.status(400).json({ error: 'Use a different CPF' });

    const customer = {
        id: uuidv4(),
        name,
        cpf,
        transactions: []
    };
    customers.push(customer);
  
    return res.status(201).json(customer);
});

router.put('/account', accountExists, (req, res) => {
    const { name } = req.body;
    const { customer } = req;

    customer.name = name;
    
    return res.json(customer)
});

router.get('/account', accountExists, (req, res) => {
    const { customer } = req;

    return res.json(customer);
});

router.delete('/account', accountExists, (req, res) => {
    const { customer } = req;
    const { cpf } = req.headers;

    const customerIndex = customers.findIndex(customer=> customer.cpf === cpf);
    customers.splice(customerIndex, 1)

    return res.status(204).json();
});

router.get('/transactions', accountExists, (req, res) => {
    const { customer } = req;
    return res.json(customer.transactions);
});

router.get('/transactions/date', accountExists, (req, res) => {
    const { customer } = req;
    const { date } = req.query;

    const transaction = customer.transactions.filter(transactions => transactions.created_at.toISOString().includes(date))

    return res.json(transaction);
});

router.post('/deposit', accountExists, (req, res) => {
    const { description, amount } = req.body;
    const { customer } = req;

    const deposit = {
        description,
        amount,
        created_at: new Date(),
        type: 'credit'
    };

    customer.transactions.push(deposit);

    return res.status(201).json(deposit);
});

router.post('/withdraw', accountExists, (req, res) => {
    const { customer } = req;
    const { amount } = req.body;
    const  balance  = getBalance(customer.transactions);
  
    if ( balance < amount )return res.status(400).send({ error: 'Insufficient Funds'});
    
    const withdraw = {
      amount, 
      created_at: new Date(),
      type: "debit"
    }

    customer.transactions.push(withdraw);

    return res.status(201).json(withdraw);
});

router.get('/balance', accountExists, (req, res) => {
    const { customer } = req;
    const balance = getBalance(customer.transactions)

    return res.json(balance)
})

module.exports = router