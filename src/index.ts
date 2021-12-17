let sortWithMemory = (json: any): any => {
  const { result, order_by, direction } = json;

  if (
    (order_by && direction === Direction.ASC) ||
    direction === Direction.DESC
  ) {
    return {
      run: (orderBy: string) => {
        let newdirection = Direction.ASC;

        if (order_by === orderBy && direction === Direction.ASC) {
          newdirection = Direction.DESC;
        }

        let resultwithmemory = {
          result: sortJSON(result, orderBy, newdirection),
          order_by: orderBy,
          direction: newdirection,
        };

        return resultwithmemory;
      },
    };
  } else {
    return {
      run: (orderBy: string) => {
        let newdirection = Direction.ASC;

        let resultwithmemory = {
          result: sortJSON(json, orderBy, newdirection),
          order_by: orderBy,
          direction: newdirection,
        };

        return resultwithmemory;
      },
    };
  }
};

let sort = (list: any) => {
  return {
    asc: (sortBy: string) => {
      return sortJSON(list, sortBy, Direction.ASC);
    },
    desc: (sortBy: string) => {
      return sortJSON(list, sortBy, Direction.DESC);
    },
  };
};

let sortNullsLast = (list: any) => {
  return {
    asc: (sortBy: string) => {
      return sortJSON(list, sortBy, Direction.ASC, Position.LAST);
    },
    desc: (sortBy: string) => {
      return sortJSON(list, sortBy, Direction.DESC, Position.LAST);
    },
  };
};

let sortNullsFirst = (list: any) => {
  return {
    asc: (sortBy: string) => {
      return sortJSON(list, sortBy, Direction.ASC, Position.FIRST);
    },
    desc: (sortBy: string) => {
      return sortJSON(list, sortBy, Direction.DESC, Position.FIRST);
    },
  };
};

let sortJSON = (
  list: string,
  key: string,
  order: Direction,
  nulls?: Position
) => {
  try {
    list = JSON.parse(list);
  } catch (e) {
    list = list;
  }

  let tempArray: SortObject[] = [];

  for (let item of list) {
    let object = item;
    let objectKey = "";

    let keys: string[] = key.split(".");
    for (let keyItem of keys) {
      item = item[keyItem as any];
      objectKey = item;
    }
    tempArray.push({ key: objectKey, object: object });
  }

  let sortedArray = tempArray.sort((a: any, b: any): any => {
    if (typeof a === Type.STRING) {
      return compareStrings(a.key, b.key, order, nulls);
    } else if (typeof a === Type.NUMBER || typeof a === Type.OBJECT) {
      return compareNumber(a.key, b.key, order, nulls);
    }
    return "";
  });

  let jsonNewArray = [];

  for (let i in sortedArray) {
    jsonNewArray.push(sortedArray[i].object);
  }
  return jsonNewArray;
};

let compareStrings = (
  a: string,
  b: string,
  order: Direction,
  nulls?: Position
) => {
  if (nulls != null && (a == null || b == null)) {
    return handleNulls(a, b, nulls);
  }
  a = a.toLowerCase();
  b = b.toLowerCase();

  if (order.toLowerCase() === Direction.ASC) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  if (order.toLowerCase() === Direction.DESC) {
    return b < a ? -1 : b > a ? 1 : 0;
  }
};

let compareNumber = (
  a: string,
  b: string,
  order: Direction,
  nulls?: Position
): number => {
  if (nulls != null && (a == null || b == null)) {
    return handleNulls(a, b, nulls);
  }
  if (order.toLowerCase() === Direction.ASC) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  if (order.toLowerCase() === Direction.DESC) {
    return b < a ? -1 : b > a ? 1 : 0;
  }
  return 0;
};

let handleNulls = (a: string, b: string, nulls: Position) => {
  let result = 0;
  if (a == null && b != null) {
    result = 1;
  }
  if (a != null && b == null) {
    result = -1;
  }
  if (a == null && b == null) {
    result = 0;
  }

  switch (nulls) {
    case Position.LAST:
      return result;
    case Position.FIRST:
      return result * -1;
  }
};

enum Position {
  FIRST = "first",
  LAST = "last",
}

enum Direction {
  ASC = "asc",
  DESC = "desc",
}

enum Type {
  STRING = "string",
  OBJECT = "object",
  NUMBER = "number",
}

interface SortObject {
  key: string;
  object: string;
}

export = {
  sortWithMemory,
  sortNullsLast,
  sortNullsFirst,
  sort,
};
