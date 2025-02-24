export interface ILogin {
  grant_type?: string
  username: string
  password: string
  scope?: string
  client_id?: string
  client_secret?: string
}

export interface IUser {
  id: string
  username: string
  email: string
  roles: string[]
  created_at: string
}
