const Account = require('../models/Account')

exports.transferMoney = async (req, res) => {
  const { senderId, receiverId, amount } = req.body

  if (!senderId || !receiverId || !amount) {
    return res.status(400).json({ error: 'senderId, receiverId, and amount are required' })
  }

  if (amount <= 0) {
    return res.status(400).json({ error: 'Transfer amount must be greater than zero' })
  }

  try {
    const sender = await Account.findById(senderId)
    const receiver = await Account.findById(receiverId)

    if (!sender) return res.status(404).json({ error: 'Sender account not found' })
    if (!receiver) return res.status(404).json({ error: 'Receiver account not found' })

    if (sender.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' })
    }

    sender.balance -= amount
    receiver.balance += amount

    await sender.save()
    await receiver.save()

    res.json({
      message: 'Transfer successful',
      sender: { name: sender.name, balance: sender.balance },
      receiver: { name: receiver.name, balance: receiver.balance }
    })
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message })
  }
}
