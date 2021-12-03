const dgram = require('dgram')
const OSC = require('osc-js')

const socket = dgram.createSocket('udp4')

// send a messsage via udp
const message = new OSC.Message("/run-code")
const binary = message.pack()
socket.send(new Buffer.from(binary), 0, binary.byteLength, 4560, 'localhost')

// receive a message via UDP
socket.on('message', data => {
  const msg = new OSC.Message()
  msg.unpack(data)
  console.log(msg.args)
})

