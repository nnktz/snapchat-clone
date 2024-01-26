import mongoose, { ConnectOptions, Connection } from 'mongoose'

let cachedConnection: Connection | null = null

export async function connectToDB() {
  if (cachedConnection) {
    console.log('Using cached MONGODB connection')
    return cachedConnection
  }

  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI as string,
      {
        dbName: 'SnapChat',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions,
    )
    cachedConnection = conn.connection
    console.log('New mongodb connection established')
  } catch (error) {
    console.error(error)
    throw error
  }
}
