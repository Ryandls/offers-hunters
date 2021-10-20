import axios from 'axios'

export const http = axios.create({
  baseURL: "https://offer-hunters.gigalixirapp.com/",
  //headers: { Authorization:  },
})

export const httpG = axios.create({
  baseURL: "https://www.googleapis.com/",
  //headers: { Authorization:  },
})

