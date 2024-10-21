import { Module } from '@nestjs/common';
import { MachineService } from './service/machine.service';
import { MachineController } from './controller/machine.controller';

@Module({
    providers: [MachineService],
    controllers: [MachineController]
})
export class MachinesModule {}
