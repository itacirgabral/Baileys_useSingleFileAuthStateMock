import baileys, { BufferJSON /*, useSingleFileAuthState*/ } from '@adiwajshing/baileys-md'
import useSingleFileAuthState from './index'

const { state, saveState } = useSingleFileAuthState('./auth_info_multi.json')

;(async () => {
  const sock0 = baileys({
    printQRInTerminal: true,
    auth: state,
  })

  sock0.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
    if(connection === 'close') {
      const sockN = baileys({
        auth: state,
      })
      sockN.ev.on('creds.update', saveState)
      sockN.ev.on('contacts.upsert', () => console.log('contacts.upsert'))
      sockN.ev.on('chats.upsert', () => console.log('chats.upsert'))
      sockN.ev.on('connection.update', () => console.log('connection.update'))
      sockN.ev.on('chats.set', () => console.log('chats.set'))
      sockN.ev.on('chats.update', () => console.log('chats.update'))
      sockN.ev.on('chats.delete', () => console.log('chats.delete'))
      sockN.ev.on('presence.update', () => console.log('presence.update'))
      sockN.ev.on('contacts.update', () => console.log('contacts.update'))
      sockN.ev.on('messages.delete', () => console.log('messages.delete'))
      sockN.ev.on('messages.update', () => console.log('messages.update'))
      sockN.ev.on('message-info.update', () => console.log('message-info.update'))
      sockN.ev.on('groups.update', () => console.log('groups.update'))
      sockN.ev.on('group-participants.update', () => console.log('group-participants.update'))
      sockN.ev.on('blocklist.set', () => console.log('blocklist.set'))
      sockN.ev.on('blocklist.update', () => console.log('blocklist.update'))
    }
  })
  sock0.ev.on('creds.update', saveState)
})()