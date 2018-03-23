[![botact](https://img.shields.io/npm/v/botact.svg?style=flat-square)](https://www.npmjs.com/package/botact/)
[![botact](https://img.shields.io/node/v/botact.svg?style=flat-square)](https://nodejs.org/en/)

# botact-micro.js

Botact enables developers to focus on writing reusable application logic instead of spending time building infrastructure.

### ! This is "micro" version, which doesn't include some functions, like Botact Flow, `hears`, `command` !
#### [Original version of botact.js](https://github.com/bifot/botact)

## Table of content 
* [Install](#install)
* [Usage](#usage)
* [Botact API](#botact-api)
* [TypeScript](#typescript)
* [Tests](#tests)
* [License](#license)


## Install

```sh
$ npm i https://github.com/Antosik/botact-micro
```


## Usage

```javascript
const bodyParser = require('body-parser')
const express = require('express')
const { Botact } = require('botact-micro')

const app = express()
const bot = new Botact({
  confirmation: process.env.CONFIRMATION,
  token: process.env.TOKEN
})

bot.event('group_join', ({ reply }) => reply('Thanks!'))
bot.on(({ reply }) => reply('What?'))

app.use(bodyParser.json())
app.post('/', bot.listen)
app.listen(process.env.PORT)
```


## Botact API
### Methods
**Core**
* [constructor(settings)](#constructorsettings)
* [.api(method, settings)](#apimethod-settings)
* [.execute(method, settings, callback)](#executemethod-settings-callback)
* [.reply(user_id, message, attachment)](#replyuser_id-message-attachment)
* [.listen(req, res)](#listenreq-res)

**Actions**
* [.event(event, callback)](#eventevent-callback)
* [.on(type, callback)](#ontype-callback)
* [.use(callback)](#usecallback)

**Upload helpers**
* [.uploadCover(file, settings)](#uploadcoverfile-settings)
* [.uploadDocument(file, peer_id ,type)](#uploaddocumentfile-peer_id-type)
* [.uploadPhoto(file, peer_id)](#uploadphotofile-peer_id)
---

## Botact API: Core [↑](#botact-api)
### constructor(settings)
Create bot.  

Botact Flow:  
Turn `settings.redis` to true, if you will use [Botact Flow](#botact-flow-api).  
For detailed redis config see [this](https://github.com/NodeRedis/node_redis#options-object-properties)

Definition: 
```typescript
constructor (settings: {
  confirmation: string;   // required
  token: string;          // required
  group_id?: number;
})
```
Usage:

```javascript
const { Botact } = require('botact')

const bot = new Botact({
  confirmation: process.env.CONFIRMATION,
  token: process.env.TOKEN
})
```

### .api(method, settings)
Call API method (https://vk.com/dev/methods).

Definition:
```typescript
async api (
  method: string,        // required 
  options?: object,      // api call parameters
): Promise<any>;         // Promise with response/error
```
Usage:
```js
const user_data = await bot.api('users.get', {
  user_ids: 1
})
```

### .execute(method, settings, callback)
Call API by [execute](https://vk.com/dev/execute).

Definition:
```typescript
async execute (
  method: string,        // required 
  options?: object,      // api call  parameters
  callback?: function    
): Promise<any>;         // Promise with response/error
 ```

Usage:
```js
bot.execute('users.get', {
  user_ids: 1
}, (body) => {
  // {
  //   response: [{
  //     id: 1,
  //     first_name: 'Павел',
  //     last_name: 'Дуров'
  //   }]
  // }
})
```

### .reply(user_id, message, attachment)
Sends message to user

Definition:
```typescript
async reply (
  user_id: number, 
  message: string,      // required, if attachment not setten 
  attachment: string    // required, if message not setten 
): Promise<any>         // Promise with response/error
```

Usage:
```javascript
bot.on((ctx) => {
  // with shortcut from context
  ctx.reply('Hi, this is start!')
  // function from context
  ctx.sendMessage(ctx.user_id, 'Hi, this is start!')
  // simple usage
  bot.reply(ctx.user_id, 'Hi, this is start!')
  // to multiple users
  bot.reply([ ctx.user_id, 1 ], 'Hi, this is start!')
})
```

### .listen(req, res)
Start listen [Express](https://github.com/expressjs/express/) server.

Definition:
```typescript
listen (
  req: any,     // Express request, required
  res: any      // Express response, required
)
```

Usage:
```javascript
bot.listen(req, res)
```


## Botact API: Actions  [↑](#botact-api)
### .event(event, callback)
Add [event](https://vk.com/dev/groups_events) handler .

Definition:
```typescript
event (
  event: string | string[], 
  callback: function
): Botact;
```
Usage:
```javascript
bot.event('group_join', ({ reply }) => reply('Thanks!'))
```

### .on(type, callback)
Add reserved callback.

Definition:
```typescript
on (
  type: string, 
  callback: function
): Botact;

OR

on (
  callback: function
): Botact;
```
Usage:
```javascript
bot.on(({ reply }) => reply('What?'))
bot.on('audio', ({ reply }) => reply('Great music!'))
```

### .use(callback)
Add middleware.

Definition:
```typescript
use (
  callback: function
): Botact
```
Usage:
```js
bot.use(ctx => ctx.date = new Date())

bot.on(({ date }) => {
  // Fri Nov 24 2017 16:00:21 GMT+0300 (MSK)
})
```


## Botact API: Upload helpers  [↑](#botact-api)
### .uploadCover(file, settings)
Upload and save cover.
See detailed settings [here](https://vk.com/dev/photos.getOwnerCoverPhotoUploadServer).

Definition:
```typescript
async uploadCover (
  filepath: string,    // Path to file with cover
  settings?: object
): Promise<any>        // Promise with response/error
```
Usage:
```javascript
await bot.uploadCover('./cover.jpg', { crop_x2: 1590 })
// {
//   images: [
//     { 
//       url: "URL",
//       width: 1920,
//       height: 1080 
//     },
//     [Object],
//     [Object],
//     [Object],
//     [Object]
//   ]
// }
```

### .uploadDocument(file, peer_id, type)
Uploads document to peer.

Definition:
```typescript
async uploadDocument (
  filepath: string,               // Path to file
  peer_id: number, 
  type: 'doc' | 'audio_message'   // 'doc' by default
): Promise<any>;                  // Promise with response/error
```
Usage:
```javascript
await bot.uploadDocument('./book.pdf', 1234)
// { 
//   response:
//     [{ 
//       id: 1234,
//       owner_id: 1234,
//       title: "",
//       ... 
//     }]
// }
```

### .uploadPhoto(file, peer_id)
Uploads photo to peer.

Definition:
```typescript
async uploadPhoto (
  filepath: string,   // Path to picture
  peer_id: number
): Promise<any>       // Promise with response/error
```
Usage:
```javascript
await bot.uploadPhoto('./picture.png', 1234)
// {
//   id: 1234,
//   album_id: 1234,
//   owner_id: 1234,
//   ...
// }
```

---
## TypeScript
Botact includes [TypeScript](https://www.typescriptlang.org/) definitions.


## Tests

```sh
$ npm test
```


## License

MIT.
