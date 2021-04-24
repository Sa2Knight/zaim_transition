import { ZaimClient } from './zaimClient'

export class PrivateZaimClient extends ZaimClient {
  constructor() {
    super(
      process.env.PRIVATE_ZAIM_KEY as string,
      process.env.PRIVATE_ZAIM_SECRET as string,
      process.env.PRIVATE_ZAIM_TOKEN as string,
      process.env.PRIVATE_ZAIM_TOKEN_SECRET as string
    )
  }
}
