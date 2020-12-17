import { Response } from '@angular/http';

export class HttpAdapter {

  static baseAdapter(res: Response, adapterFn?: Function): any {
    if (res.status === 200) {
      try {
        const jsonRes = res.json();
        return adapterFn ? adapterFn.call(undefined, jsonRes) : jsonRes;
      } catch (e) {
        return res;
      }
    }
  }
}
