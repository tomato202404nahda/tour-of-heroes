export enum PowerList {
  SS = 'Superspeed',
  OS = 'Omniscience',
  SM = 'Spatial Manipulation',
  TM = 'Temporal Manipulation',
  IV = 'Invulnerability',
  EX = 'Explosion',
  US = 'Unlimited Stamina',
  LI = 'Laughter Inducing',
  TH = 'Freely Control Thunder',
  FL = 'Absolute Fire Control',
  PM = 'Healing',
  RB = 'Rubberlike Body',
  MC = 'Control Metals',
  HY = 'Hypnosis',
  WC = 'Wind Control',
}

export function powerList() {
  let all = [];

  for (let key in PowerList) {
    all.push(PowerList[key]);
  }

  return all;
}
