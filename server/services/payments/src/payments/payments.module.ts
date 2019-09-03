import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { PaymentEntity } from "./payment.entity";
import { PaymentController } from "./payment.controller";
@Module({
    imports: [TypeOrmModule.forFeature([PaymentEntity])],
    providers: [PaymentService],
    controllers: [PaymentController]
})
export class PaymentsModule {}
