import {rest} from 'msw'

const API_URL = "http://localhost:3000"
const jsonData = [
  {
    "_id": "623f839a3d97bf6cf1dddb2a",
    "title": "juanito",
    "link": "juanito",
    "long_url": "https://reqres.in/img/faces/2-image.jpg",
    "is_active": true,
    "__v": 0
  },
  {
    "_id": "62405da6ee38616d5bba07c8",
    "title": "scoppiap",
    "link": "scoppiap",
    "long_url": "https://reqres.in/img/faces/2-image.jpg",
    "is_active": true,
    "createdAt": "2022-03-27T12:50:46.630Z",
    "updatedAt": "2022-03-27T12:50:46.630Z",
    "__v": 0
  }
];

const _handlers = [
  rest.get(API_URL + '/link/', (req, res, ctx) => {
    return res(
      ctx.json(jsonData)
    )
  }),
  rest.put(API_URL + '/link/:id', (req, res, ctx) => {
    return res(
      ctx.json(jsonData[0])
    )
  })
]

for (const link of jsonData) {
  _handlers.push(
    rest.get(API_URL + '/link/' + link._id, (req, res, ctx) => {
      return res(
        ctx.json(link)
      )
    })
  )
}

export const handlers = _handlers;

