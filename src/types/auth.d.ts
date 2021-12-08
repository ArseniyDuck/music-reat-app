type UserType = {
   id: number | null
   username: string
}

type SignUpUserType = {
   username: string,
   password1: string,
   password2: string
}

type SignInUserType = {
   username: string
   password: string
}

type TokensType = {
   access: string,
   refresh: string
}