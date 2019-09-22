const mongoose = require('mongoose')
const User = mongoose.model('users')
const Transaction = mongoose.model('transactions')

class HandlerGenerator {

    login(req, res) {

        var user = new User()
        user.save()
            .then(user => {
                let token = jwt.sign({ id: user._id },
                    config.secret,
                    {
                        expiresIn: '24h' // expires in 24 hours
                    }
                );
                // return the JWT token for the future API calls
                res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                });
            }, err => {
                res.send(403).json({
                    success: false,
                    message: 'Some error occurred'
                });
            })

    }
    index(req, res) {
        res.json({
            success: true,
            message: 'Index page',
            data: req.decoded
        });
    }

    balance(req, res) {
        var user = req.user
        res.json({
            success: true,
            balance: user.balance,
            currency: user.currency
        })
    }

    spend(req, res) {
        var amount = req.body.amount,
            description = req.body.description,
            user = req.user,
            currency = req.body.currency;

        console.log(amount)
        var balance = user.balance
        balance -= amount
        user.balance = balance
        user.save()
            .then(user => {
                var transaction = new Transaction({
                    amount,
                    description,
                    currency,
                    user
                })

                return transaction.save()
            })
            .then(t => {
                res.json({
                    success: true,
                    message: 'Transaction saved successfully',
                    payload: t
                })
            })
            .catch(e => {
                res.json({
                    success: false,
                    message: e
                })
            })

    }

    transactions(req, res) {
        var user = req.user
        Transaction.find({ user }, (err, transactions) => {
            if (!err) {
                res.json({
                    success: true,
                    message: 'Transactions fetched successfully',
                    transactions
                })
            }
        })
    }
}

module.exports = new HandlerGenerator()