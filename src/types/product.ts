
export interface Product {
  id: number;
  name: string;
  brand: string;
  image: string;
  price: number;
  features: {
    batteryLife: string;
    screenSize: string;
    storage: string;
    camera: string;
    processor: string;
  };
}
