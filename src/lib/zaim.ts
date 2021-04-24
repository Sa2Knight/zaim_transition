import Zaim from 'zaim'

class ZaimClient {
  public client: Zaim

  constructor(key: string, secret: string, token: string, tokenSecret: string) {
    this.client = new Zaim({
      consumerKey: key,
      consumerSecret: secret,
      accessToken: token,
      accessTokenSecret: tokenSecret
    })
  }
}

export class CurrentZaimClient extends ZaimClient {
  constructor() {
    super(
      process.env.CURRENT_ZAIM_KEY as string,
      process.env.CURRENT_ZAIM_SECRET as string,
      process.env.CURRENT_ZAIM_TOKEN as string,
      process.env.CURRENT_ZAIM_TOKEN_SECRET as string
    )
  }
}
