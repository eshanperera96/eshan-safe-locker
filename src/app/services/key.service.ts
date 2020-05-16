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
    const key = this.randomService.generateRandomString(6);

    return {
      key,
      uniqueKey
    };
  }

  public verifySecreteKey(systemSecreteKey: SecreteKey, userSecreteKey: SecreteKey): boolean {
    if (systemSecreteKey.uniqueKey + systemSecreteKey.key !== userSecreteKey.finalKey) {
      console.log('secrete key verify failed!');
      return false;
    } else {
      console.log('secrete key verified!');
      return true;
    }
  }
}
