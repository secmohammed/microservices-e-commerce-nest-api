import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

interface Product {
  name: string;
  price: number;
}
@Controller()
export class AppController {
  @MessagePattern('products')
  index(data: any): Array<Product> {
    console.log(data);
    return [
      {
        name: 'Macbook pro 2016',
        price: 30.0,
      },
      {
        name: 'Macbook Pro 2017',
        price: 30.0,
      },
    ];
  }
}
