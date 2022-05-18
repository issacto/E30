import axios from 'axios'

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

interface Song {
  Name?: String
  Listeners?: String
  Artist?: String
}

interface SongStoredResponse {
  Name?: String
  Listeners?: String
  Artist?: String
  Date?: String
}

interface SongInsertionInput {
  Song: Song
  Email: String
}

interface SongDeletionInput {
  Email: String
  Name?: String
  Date?: String
}

interface DailyTopResponse {
  data: Song[] | null
  error: Error | null
}

interface CollectionResponse {
  data: SongStoredResponse[] | null
  error: Error | null
}

interface SignUpInput {
  Age: String
  Email: String
  Name: String
  Password: String
}

interface SignUpResponse {
  wasSuccessful?: boolean
  error?: Error
}

interface SignInInput {
  Email: String
  Password: String
}

interface SigninResponse {
  wasSuccessful?: boolean
  error?: Error
}

interface EmailInput {
  Email: String
}

async function getDailyTop(): Promise<DailyTopResponse> {
  var config = {
    method: 'get',
    url: `${backendURL}/song/getDailySongs`,
  }

  const result: DailyTopResponse = await axios(config)
    .then((response) => {
      console.log('response.data')
      console.log(response.data)
      return { data: response.data.data, error: null }
    })
    .catch(function (error: Error) {
      console.log(error)
      return { data: null, error: error }
    })
  return result
}

async function signUp(data: SignUpInput): Promise<SignUpResponse> {
  var config = {
    method: 'post',
    url: `${backendURL}/user/signup`,
    headers: {
      'Content-Type': 'application/json; charset=utf8',
    },
    data: data,
  }

  const result: SignUpResponse = await axios(config)
    .then((response) => {
      console.log('response.data')
      return { wasSuccessful: response.data }
    })
    .catch(function (error: Error) {
      console.log('error')
      console.log(error)
      return { error: error }
    })
  return result
}

async function signIn(data: SignInInput): Promise<SigninResponse> {
  var config = {
    method: 'post',
    url: `${backendURL}/user/signin`,
    headers: {
      'Content-Type': 'application/json; charset=utf8',
    },
    data: data,
  }

  const result: SigninResponse = await axios(config)
    .then((response) => {
      console.log('response.data')
      return { wasSuccessful: response.data }
    })
    .catch(function (error: Error) {
      return { error: error }
    })
  return result
}

async function getCollection(data: EmailInput): Promise<CollectionResponse> {
  var config = {
    method: 'get',
    url: `${backendURL}/user/getFavSongs?Email=${data.Email}`,
  }

  const result: CollectionResponse = await axios(config)
    .then((response) => {
      console.log('response.data')
      console.log(response.data)
      return { data: response.data.data, error: null }
    })
    .catch(function (error: Error) {
      console.log(error)
      return { data: null, error: error }
    })
  return result
}

async function insertASong(data: SongInsertionInput): Promise<SigninResponse> {
  var config = {
    method: 'post',
    url: `${backendURL}/user/insertFavSong`,
    headers: {
      'Content-Type': 'application/json; charset=utf8',
    },
    data: data,
  }

  const result: SigninResponse = await axios(config)
    .then((response) => {
      console.log('response.data')
      return { wasSuccessful: response.data }
    })
    .catch(function (error: Error) {
      return { error: error }
    })
  return result
}

async function deleteASong(data: SongDeletionInput): Promise<SigninResponse> {
  var config = {
    method: 'delete',
    url: `${backendURL}/user/deleteFavSong`,
    headers: {
      'Content-Type': 'application/json; charset=utf8',
    },
    data: data,
  }

  const result: SigninResponse = await axios(config)
    .then((response) => {
      console.log('response.data')
      return { wasSuccessful: response.data }
    })
    .catch(function (error: Error) {
      return { error: error }
    })
  return result
}

export { getDailyTop, getCollection, signUp, signIn, insertASong, deleteASong }
export type {
  DailyTopResponse,
  Song,
  SignUpResponse,
  SignInInput,
  SongStoredResponse,
  EmailInput,
  CollectionResponse,
  SongInsertionInput,
  SongDeletionInput,
}
