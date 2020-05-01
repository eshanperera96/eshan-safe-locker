export interface SecreteKey {
  key: string;
  encryptedKey: string;
  decryptedKey?: string;
  // users: Array<User>
}
