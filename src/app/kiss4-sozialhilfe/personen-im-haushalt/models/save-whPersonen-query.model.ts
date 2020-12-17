// Query for API SaveWhPersonen
export interface ISaveWhPersonen {
  value: boolean;
}
export class SaveWhPersonenQuery implements ISaveWhPersonen {
  value: boolean;
  constructor(data: ISaveWhPersonen) {
    if (data) {
      this.value = data.value;
    }
  }
}
