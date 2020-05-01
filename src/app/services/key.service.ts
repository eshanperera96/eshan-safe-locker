import { Injectable } from '@angular/core';
import {SecreteKey} from '../model/secrete-key';

@Injectable({
  providedIn: 'root'
})
export class KeyService {

  constructor() { }

  public generateKey(): SecreteKey {
    const secreteKey: SecreteKey = {
      key: '123456',
      encryptedKey: 'g6o8v3jrEYhuZ/NNWAO4AQ==',
    };
    secreteKey.decryptedKey = 'test-secrete-key';
    return secreteKey;
  }
}
