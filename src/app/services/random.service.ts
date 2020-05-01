import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  constructor() {
  }

  public generateRandomString(length: number): string {
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';

    const characterLists = [];

    let randomString = '';
    for (let i = 0; i < length; i++) {

      characterLists.push(this.shuffleCharList(uppercaseLetters));
      characterLists.push(this.shuffleCharList(lowercaseLetters));
      characterLists.push(this.shuffleCharList(numbers));

      const randomCharListsIndex = Math.floor(Math.random() * characterLists.length);
      const randomCharIndex = Math.floor(Math.random() * characterLists[randomCharListsIndex].length);

      const randomChar = characterLists[randomCharListsIndex][randomCharIndex];
      randomString += randomChar;
    }
    return randomString;
  }

  private shuffleCharList(charList: string): string {
    // TODO: implement this
    return charList;
  }
}
