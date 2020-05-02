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
    // const key = this.randomService.generateRandomString(6);
    // const encryptKey = this.cryptoService.encryptString(key, uniqueKey);

    return {
      key: '123456',
      uniqueKey
    };
  }

  public verifySecreteKey(systemSecreteKey: SecreteKey, userSecreteKey: SecreteKey): boolean {
    return !(systemSecreteKey.uniqueKey + systemSecreteKey.key !== userSecreteKey.decryptedKey);

    // return !(systemSecreteKey.decryptedKey !== userSecreteKey.decryptedKey
    //   || systemSecreteKey.encryptedKey !== userSecreteKey.encryptedKey
    //   || systemSecreteKey.uniqueKey !== userSecreteKey.uniqueKey);
  }
}
