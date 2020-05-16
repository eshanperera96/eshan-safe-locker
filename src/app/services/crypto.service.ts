import { Injectable } from '@angular/core';
import {RandomService} from './random.service';
import {EncryptKey} from '../model/secrete-key';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private randomService: RandomService) { }

  public encryptString(key, uniqueKey): EncryptKey {
    const decryptKey = this.randomService.generateRandomString(64);

    return {
      encryptedKey: '587XMMGmGYzE55IkWGeg1cdk10vLy7K', finalKey: decryptKey
    };
  }
}
