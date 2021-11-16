import bcrypt from 'bcryptjs';

export class PasswordHandler {
  private saltRounds: number | string;

  constructor() {
    this.saltRounds = bcrypt.genSaltSync(10);
  }

  async hashPassword(newPassword): Promise<string> {
    const hashedPassword = await bcrypt.hash(newPassword, this.saltRounds);
    return hashedPassword;
  }
}
