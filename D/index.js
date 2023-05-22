function func(obj) {
    const key = Object.keys(obj)[0];
    const value = obj[key];
    return `info_${key}_${value}`;
  }