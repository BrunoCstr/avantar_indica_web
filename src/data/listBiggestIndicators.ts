export interface listBiggestIndicatorsProps {
  name: string;
  quantity: number;
  converted: number;
  userAt: string;
}

export const listBiggestIndicators: listBiggestIndicatorsProps[] = [
  { name: "Jesse Pinkman", quantity: 5, converted: 1, userAt: "30/04/2025" },
  { name: "Walter White", quantity: 5, converted: 1, userAt: "30/04/2025" },
  { name: "Hank Schrader", quantity: 5, converted: 1, userAt: "30/04/2025" },
  { name: "Gus Fring", quantity: 5, converted: 1, userAt: "30/04/2025" },
  { name: "Mike Ehrmantraut", quantity: 5, converted: 1, userAt: "30/04/2025" },
];
