export interface Operator {
  slug: string
  name: string
  shortName: string
  logo: string
  color: string
  busPhoto?: string
}

export const operators: Record<string, Operator> = {
  'Victory Liner': {
    slug: 'victory-liner',
    name: 'Victory Liner',
    shortName: 'Victory',
    logo: '/images/operators/victory-liner.svg',
    color: '#ED1A25',
    busPhoto: '/images/buses/victory-liner.jpg',
  },
  'Partas': {
    slug: 'partas',
    name: 'Partas',
    shortName: 'Partas',
    logo: '/images/operators/partas.svg',
    color: '#29166F',
    busPhoto: '/images/buses/partas.jpg',
  },
  'Genesis': {
    slug: 'genesis',
    name: 'Genesis Transport',
    shortName: 'Genesis',
    logo: '/images/operators/genesis.svg',
    color: '#092178',
    busPhoto: '/images/buses/genesis.jpg',
  },
  'Joy Bus': {
    slug: 'joybus',
    name: 'Joy Bus',
    shortName: 'JoyBus',
    logo: '/images/operators/joybus.svg',
    color: '#FF9400',
    busPhoto: '/images/buses/joybus.jpg',
  },
  'Five Star': {
    slug: 'five-star',
    name: 'Five Star Bus',
    shortName: 'Five Star',
    logo: '/images/operators/five-star.svg',
    color: '#499AEA',
    busPhoto: '/images/buses/five-star.jpg',
  },
  'Philtranco': {
    slug: 'philtranco',
    name: 'Philtranco',
    shortName: 'Philtranco',
    logo: '/images/operators/philtranco.svg',
    color: '#1E1F93',
    busPhoto: '/images/buses/philtranco.jpg',
  },
  'DLTB': {
    slug: 'dltb',
    name: 'DLTB Co.',
    shortName: 'DLTB',
    logo: '/images/operators/dltb.svg',
    color: '#DD0000',
    busPhoto: '/images/buses/dltb.jpg',
  },
  'Farinas': {
    slug: 'farinas',
    name: 'Farinas Trans',
    shortName: 'Farinas',
    logo: '/images/operators/farinas.svg',
    color: '#035A30',
    busPhoto: '/images/buses/farinas.jpg',
  },
  'GV Florida': {
    slug: 'gv-florida',
    name: 'GV Florida Transport',
    shortName: 'GV Florida',
    logo: '/images/operators/gv-florida.svg',
    color: '#FA0030',
    busPhoto: '/images/buses/gv-florida.jpg',
  },
  'Ohayami': {
    slug: 'ohayami',
    name: 'Ohayami Trans',
    shortName: 'Ohayami',
    logo: '/images/operators/ohayami.svg',
    color: '#126FF4',
    busPhoto: '/images/buses/ohayami.jpg',
  },
  'JAM Liner': {
    slug: 'jam-liner',
    name: 'JAM Liner',
    shortName: 'JAM',
    logo: '/images/operators/jam-liner.svg',
    color: '#EC3237',
    busPhoto: '/images/buses/jam-liner.jpg',
  },
  'Dominion': {
    slug: 'dominion',
    name: 'Dominion Bus Lines',
    shortName: 'Dominion',
    logo: '/images/operators/dominion.svg',
    color: '#1E3A8A',
    busPhoto: '/images/buses/dominion.jpg',
  },
  'Viron': {
    slug: 'viron',
    name: 'Viron Transit',
    shortName: 'Viron',
    logo: '/images/operators/viron.svg',
    color: '#0f4c3a',
    busPhoto: '/images/buses/viron.jpg',
  },
}

export function getOperator(name: string): Operator | undefined {
  return operators[name]
}
