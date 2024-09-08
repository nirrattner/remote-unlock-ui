export type Door = {
  id: number,
  name: string,
};

export type DoorResponse = {
  body: {
    doors: Array<Door>
  }
};

