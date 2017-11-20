import diamorphosis from './diamorphosis';

let isCorrectInput = { configFolder: 'bar' };
let isNotCorrectInput = { foo: 'bar' };

diamorphosis(isCorrectInput);
diamorphosis(isNotCorrectInput);
