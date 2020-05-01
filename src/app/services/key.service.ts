import {Injectable} from '@angular/core';
import {SecreteKey} from '../model/secrete-key';
import {RandomService} from './random.service';
import {CryptoService} from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class KeyService {

  constructor(private randomService: RandomService, private cryptoService: CryptoService) { }

  public generateKey(uniqueKey: string): SecreteKey {
    const key = this.randomService.generateRandomString(10);
    const encryptKey = this.cryptoService.encryptString(key, uniqueKey);

    return {
      key,
      encryptedKey: encryptKey.encryptedKey,
      decryptedKey: encryptKey.decryptedKey,
      uniqueKey
    };
  }

  public verifySecreteKey(systemSecreteKey: SecreteKey, userSecreteKey: SecreteKey): boolean {
    return !(systemSecreteKey.decryptedKey !== userSecreteKey.decryptedKey
      || systemSecreteKey.encryptedKey !== userSecreteKey.encryptedKey
      || systemSecreteKey.uniqueKey !== userSecreteKey.uniqueKey);
  }
}
