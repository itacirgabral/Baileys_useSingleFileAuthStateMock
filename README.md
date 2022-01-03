# Baileys_useSingleFileAuthStateMock

```
npm install
rm auth_info_multi.json
npx ts-node src/server.demo.ts
```

copy from [this](https://github.com/adiwajshing/Baileys/blob/110b9d1f096fbb1591cab65bd918bb85ed812cf3/src/Utils/auth-utils.ts#L115).

```typescript
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
    }
  })
  sock0.ev.on('creds.update', saveState)
})()
```