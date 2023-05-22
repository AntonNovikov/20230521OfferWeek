interface Ship {
  id: number;
  form: number[][];
}

interface ParkResult {
  shipId: number;
  position: number;
  isRotated: boolean;
}


function rotate(ship: Ship): Ship {
  return {
    id: ship.id,
    form: ship.form[0].map((_, i) => ship.form.map(row => row[i])).reverse() // поворот матрицы на 90 градусов по часовой стрелке
  };
}

function checkOverlap(parking: number[][], ship: Ship, position: number, isRotated: boolean = false) {
  const { form } = ship;
  const width = form[0].length;

  for (let i = 0; i < form.length; i++) {
    for (let j = 0; j < width; j++) {
      if (form[i][j] && parking[i][position + j] === 1) return true; // если клетка корабля и клетка парковки пересекаются, то есть коллизия
    }
  }
  return false;
}

function parkShip(parking: number[][], ship: Ship, position: number, rotated: boolean = false) {
  const { form } = ship;
  let width = form[0].length;

  for (let i = form.length - 1; i >= 0; i--) {
    for (let j = 0; j < width; j++) {
      parking[i][position + j] = form[i][j];
    }
  }
}

function unparkShip(parking: number[][], ship: Ship, position: number, rotated: boolean = false) {
  const { form } = ship;
  let width = form[0].length;
  for (let i = 0; i < form.length; i++) {
    for (let j = 0; j < width; j++) {
      if (form[i][j]) parking[i][position + j] = 0; // если клетка корабля, то убираем из парковки
    }
  }
}

function findSpot(parking: number[][], ship: Ship): number | null {
  let candidateSpots = new Set<number>();

  for (let i = 0; i <= parking[0].length - ship.form[0].length; i++) {
    for (let isRotated = 0; isRotated <= 1; isRotated++) {
      let hasOverlap = false;
      for (let j = 0; j < parking.length; j++) {
        if (checkOverlap(parking, isRotated ? rotate(ship) : ship, i, isRotated)) {
          hasOverlap = true;
          break; // если пересечение, то не подходит, идем к следующей позиции или повороту
        }
      }
      if (!hasOverlap) candidateSpots.add(i);
    }
  }

  if (!candidateSpots.size) return null;
  return [...candidateSpots][Math.floor(Math.random() * candidateSpots.size)]; // выбираем случайную из возможных точек без коллизии
}

function parkManyShips(parking: number[][], ships: Ship[]) {
  let parkedShips = [];

  for (let i = 0; i < ships.length; i++) {
    const ship = ships[i]
    let position = findSpot(parking, ship);
    if (position === null) throw new Error(`Could not find position for ship with id ${ship.id}`);
    let rotated = false;

    if (position > parking[0].length - ship.form[0].length) {
      if (!findSpot(parking, rotate(ship))) throw new Error(`Could not find position for rotated ship with id ${ship.id}`);
      rotated = true;
      [ship.form[0].length, ship.form.length] = [ship.form.length, ship.form[0].length];
      position = findSpot(parking, ship);
    }
    if (position === null) throw new Error(`Could not find position for ship with id ${ship.id}`);

    parkShip(parking, ship, position, rotated);
    parkedShips.push({
      shipId: ship.id, /// error
      position, // error
      isRotated: rotated // error
    });
  }

  return parkedShips;
}

module.exports = function parking(ships: Ship[]) { // error
  let width = Math.max(...ships.map(ship => ship.form[0].length));
  let height = ships.map(ship => ship.form.length).reduce((x, y) => x + y);
  let parking: number[][] = Array.from({ length: height }, (_) => Array.from({ length: width }, (_) => 0));

  return parkManyShips(parking, ships);
}