export interface SecreteKey extends EncryptKey{
  key: string;
  uniqueKey?: string;
}

export interface EncryptKey {
  encryptedKey?: string;
  decryptedKey?: string;
}
